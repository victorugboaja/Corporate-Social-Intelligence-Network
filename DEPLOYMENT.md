# CSIN deployment handoff

The application is packaged as a small Node service behind Caddy. Caddy obtains and renews HTTPS automatically after the domain points to the server. HTTPS is required for reliable microphone and browser-wallet access.

## Before touching the server

1. Choose the final domain or subdomain.
2. Create a DNS `A` record pointing that name to the Vultr server's public IPv4 address.
3. Allow inbound TCP ports 80 and 443. Keep port 4173 private.
4. Copy `.env.deploy.example` to `.env` and replace `demo.example.org` with the exact domain.

No wallet private key, ElevenLabs secret, payment credential or Solana key belongs in `.env`. The application uses the existing public ElevenLabs agent ID and asks the user's browser wallet to sign.

## Start or update

From this project directory on the server:

```sh
docker compose up -d --build
docker compose ps
```

Check `https://YOUR-DOMAIN/health`; it should return `{"status":"ok"}`. Then walk through `/`, `/scout`, `/evidence?org=ottawa`, `/track` and `/fund.html?org=ottawa`.

## Final-origin checks

- Landing buttons open Scout.
- Ontario + Employment returns Ottawa.
- An evidence source opens and a human review can be saved.
- The voice controls load only after a click; the user starts and ends the metered call.
- The funding button stays disabled until every current finding is reviewed and authorization is checked.
- Wallet UI states Solana devnet, 0.001 devnet SOL and the intended recipient before signing.
- A receipt becomes confirmed only when the parsed devnet transfer matches sender, recipient and amount.
- Track links to the receipt and the current report version.

If DNS has not propagated, keep the local demo available. Do not bypass certificate warnings; wait for valid HTTPS.
