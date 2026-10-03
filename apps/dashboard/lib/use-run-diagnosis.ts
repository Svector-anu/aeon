'use client'

import { useEffect, useState } from 'react'
import type { Run } from './types'
import type { Diagnosis } from './run-diagnosis'

// Failed-run diagnoses, fetched lazily (only for failed runs that are on screen)
// and kept for the page's lifetime: a finished run never changes. A failed fetch
// is forgotten, so the next render asks again (logs can lag behind completion).
const cache = new Map<number, Promise<Diagnosis | null>>()

function fetchDiagnosis(id: number): Promise<Diagnosis | null> {
  let p = cache.get(id)
  if (!p) {
    p = fetch(`/api/runs/${id}/diagnosis`).then(async (r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      return ((await r.json()) as { diagnosis: Diagnosis | null }).diagnosis
    })
    p.catch(() => cache.delete(id))
    cache.set(id, p)
  }
  return p
}

// Why `run` failed, once its log has been read; null for any other run.
export function useRunDiagnosis(run: Pick<Run, 'id' | 'conclusion'>): Diagnosis | null {
  const id = run.conclusion === 'failure' ? run.id : null
  const [result, setResult] = useState<{ id: number; diagnosis: Diagnosis | null } | null>(null)
  useEffect(() => {
    if (id === null) return
    let live = true
    fetchDiagnosis(id).then((diagnosis) => { if (live) setResult({ id, diagnosis }) }).catch(() => {})
    return () => { live = false }
  }, [id])
  return result && result.id === id ? result.diagnosis : null
}
