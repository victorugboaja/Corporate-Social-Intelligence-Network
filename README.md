# The Philanthropic Scout Network

The Philanthropic Scout Network is an AI-assisted discovery and evidence-review prototype that helps grantmakers discover charitable organizations based on their funding priorities and review structured evidence before making a funding decision.

**Fictional demonstration:** All organizations, program results, ratings and financial amounts are synthetic. This prototype does not rank real charities or verify their impact. Solana devnet test funds do not pay real grants.

[Open the prototype](https://www.csin.work/) · [Source code](https://github.com/victorugboaja/philanthropic-scout-network)

Scout → Organization Profile → Program Analysis → Human Review → Devnet Test Funding → Prospect List.

## Build disclosure

Built during Hack the Hill III with AI-assisted development using OpenAI Codex and Cursor. The participant defined the product, civic-tech problem, workflows, evidence rules, interface requirements and final implementation decisions. AI tools assisted with code generation, debugging and documentation. Third-party services used by the prototype are Auth0, ElevenLabs and Solana devnet; package dependencies are recorded in `package.json` and `package-lock.json`.

The application uses a Node.js server for static routes, health checks and a restricted Solana devnet RPC proxy. The landing page is bundled from React/TypeScript; the application workflow uses browser JavaScript. Git commits and isolated worktrees preserve the project history and keep parallel Cursor work separate until review.

## Demo

1. Open the landing and select See How It Works.
2. Select Ontario and Employment, then Scout. Open Ottawa.
3. Read an evidence source; flag a finding with an explanatory note.
4. Open the voice analyst beside the evidence. Loading controls does not start a call; the user starts and ends the ElevenLabs session.
5. Select Add evidence update, attach a text report and confirm the changed finding. The Philanthropic Scout Network creates a new report version and reopens that finding for review.
6. Review every finding before using Funding. Payment authorization is a separate action. A browser wallet and devnet balance are required for a real 0.001 devnet SOL transfer; no CAD grant is paid.
7. The Prospect List shows local review activity and any verified test-payment receipt.

Auth0 provides account authentication. Evidence versions, review and receipt state are stored in this browser for the prototype; there is no shared production database or automated report extraction. The voice agent needs the updated CSIN-DEMO-EVIDENCE.md knowledge packet; no local notes are automatically sent.

## Deployment

The public prototype is available at https://www.csin.work/. The existing domain is retained during the rebrand. The included `Dockerfile`, `compose.yaml` and `Caddyfile` package this Node server behind HTTPS. Follow `DEPLOYMENT.md`. Preserve the `/api/devnet` proxy; a static-only upload cannot run the payment flow. It forwards an allowlisted set of methods only to Solana devnet, with bounded bodies, timeout and request rate. Test microphone, wallet, routes and receipt checks on the final origin. No infrastructure purchase is authorized by these setup notes.

Use `DEMO-RUNBOOK.md` for the final readiness checklist, 90-second narration, click sequence and honest devnet fallback.
