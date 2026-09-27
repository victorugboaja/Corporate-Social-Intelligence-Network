# CSIN hackathon prototype

Canada-only, fictional funding intelligence: landing → Scout → evidence → human review → devnet test funding → Track.

## Run

Requires Node.js 22+. Run `npm ci`, `npm run build`, then `npm start`. Open http://127.0.0.1:4173/. Run `npm test` for review, matching and transfer-receipt checks.

The imported Lovable landing source lives in landing/. Its build outputs are under public/landing/. See LANDING-SOURCE.md. The existing application remains separate at /scout, /evidence, /fund.html and /track.

## Demo

1. Open the landing and select See How It Works.
2. Select Ontario and Employment, then Run Scout. Open Ottawa.
3. Read an evidence source; flag a finding with an explanatory note.
4. Open the voice analyst beside the evidence. Loading controls does not start a call; the user starts and ends the ElevenLabs session.
5. Under What changed, load Ottawa's follow-up. Changed findings need another review; earlier versions remain available for export.
6. Review every finding before using Funding. Payment authorization is a separate action. A browser wallet and devnet balance are required for a real 0.001 devnet SOL transfer; no CAD grant is paid.
7. Track shows local review activity and any verified test-payment receipt.

Review and receipt state are stored in this browser only, with no production authentication. Reports are synthetic fixtures, not live AI extraction. The voice agent needs the updated CSIN-DEMO-EVIDENCE.md knowledge packet; no local notes are automatically sent.

## Deployment

Not deployed. The included `Dockerfile`, `compose.yaml` and `Caddyfile` package this Node server behind HTTPS. Follow `DEPLOYMENT.md`. Preserve the `/api/devnet` proxy; a static-only upload cannot run the payment flow. It forwards an allowlisted set of methods only to Solana devnet, with bounded bodies, timeout and request rate. Test microphone, wallet, routes and receipt checks on the final origin. No infrastructure purchase is authorized by these setup notes.

Use `DEMO-RUNBOOK.md` for the final readiness checklist, 90-second narration, click sequence and honest devnet fallback.
