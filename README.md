# heirloom-web

Marketing landing page for **Heirloom** — an open-source, non-custodial iOS
Bitcoin inheritance wallet.

Heirloom uses a 2-key Miniscript timelock: the owner can spend at any time,
while the heir can only spend after a relative timelock (CSV) of owner
inactivity. The owner keeps the timelock fresh with periodic "heartbeat"
transactions. Because the rules are enforced on-chain by the Bitcoin network,
the inheritance works even if the company disappears.

> Read the code — it works even if we disappear.

- **iOS app (the real thing):** https://github.com/far1z/heirloom-ios
- **This website:** https://github.com/far1z/heirloom-web
- **Live site:** see [`DEPLOY_URL.txt`](./DEPLOY_URL.txt)

## Status

- **Signet only.** Not for mainnet funds yet.
- **Not independently audited.** Early software — verify before you trust.

## Stack

Plain static site. No framework, no build step.

```
index.html    markup + inline SVG diagrams
styles.css    all styling (dark flagship + light theme, Bitcoin-orange accent)
app.js        scroll reveals + client-side waitlist (no backend)
```

The waitlist form has no server: it validates client-side, stores intent in
`localStorage`, and offers a `mailto:` fallback. Nothing sensitive is collected.

## Run locally

No dependencies. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Deployed to Vercel as a static site:

```bash
vercel deploy --prod --yes
```

## Security

Please disclose vulnerabilities responsibly to
**security@heirloomcrypto.com**.

## License

MIT © 2026 HeirloomCrypto contributors. See [`LICENSE`](./LICENSE).
