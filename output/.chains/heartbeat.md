Heartbeat ran in ambient mode. The fleet status is 🔴 DEGRADED, because `auto-merge` is still failing.

- **`auto-merge`:** it has failed 4 times in a row, with a 36% success rate. Its last failure was 2026-10-16 17:20 UTC. It was already reported as critical on 2026-10-16, so I sent no new notification.
- **`heartbeat`:** its last run succeeded, so it has recovered.
- **PRs, issues, memory:** there are no open PRs, no urgent issues, and nothing flagged in memory.
- **Other skills:** nothing is missing. `aeon-update` last succeeded on 2026-10-12, and `auto-workflow` is on-demand and hasn't run yet.

The `auto-merge` failure looks like a 403 `oauth_not_allowed` from the API. I read that from the stored error text, which is cut off, so treat it as likely rather than confirmed. It matches the error behind `heartbeat`'s earlier failures.

## Summary
- Regenerated `docs/status.md` (Overall 🔴 DEGRADED, updated 2026-10-17 09:16 UTC).
- Created `memory/logs/2026-10-17.md` with a `### heartbeat` entry, `mode: ambient`, `STATUS_PAGE=DEGRADED`.
- No notification sent. The only finding was already reported in the last 48h.
- Follow-up for the operator: fix the auth problem behind the `auto-merge` 403 failures.
