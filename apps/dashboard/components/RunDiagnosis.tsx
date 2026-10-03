'use client'

import type { Run } from '../lib/types'
import { useRunDiagnosis } from '../lib/use-run-diagnosis'

// One plain line under a failed run: why it failed and what to do next, plus
// Connect when the credential is the problem. Renders nothing for other runs,
// and nothing until the log has been read (lib/use-run-diagnosis.ts).
export function RunDiagnosis({ run, onConnect, className = '' }: {
  run: Pick<Run, 'id' | 'conclusion'>
  // Opens the Connect modal for the harness the run used (when it printed one).
  onConnect?: (harness?: string) => void
  className?: string
}) {
  const d = useRunDiagnosis(run)
  if (!d) return null
  return (
    <div className={`text-[11px] font-mono leading-relaxed ${className}`}>
      <span className="text-aeon-red-alert">{d.reason}</span>{' '}
      <span className="text-primary-50">Next step: {d.hint}</span>
      {d.credential && onConnect && (
        <button onClick={() => onConnect(d.harness)} className="btn-mini-go ml-2">Connect</button>
      )}
    </div>
  )
}
