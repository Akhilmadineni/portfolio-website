# Akhil Madineni — AI & Full-Stack Engineering Portfolio

A Matrix-inspired professional portfolio presenting Akhil Madineni's experience,
technical stack, AI work, publications, education, and contact information.

## Live website

[akhil-madineni.atlanteanz.com](https://akhil-madineni.atlanteanz.com/)

## Highlights

- Responsive terminal-style interface
- Interactive Matrix rain with persistent speed, density, opacity, and trail controls
- Professional experience and measurable engineering outcomes
- AI projects, publications, skills, education, and downloadable resume
- Accessible navigation, reduced-motion support, and keyboard-friendly controls

## Technology

- React 19 and TypeScript
- vinext and Vite
- Tailwind CSS
- Cloudflare Worker-compatible output
- Docker-based NAS deployment

## Local development

Node.js 22.13 or newer is required.

```bash
npm ci
npm run dev
```

Validation commands:

```bash
npm test
npm run lint
```

## Deployment

The production portfolio is hosted on a NAS using `Dockerfile.nas` and
`compose.nas.yml`, with public HTTPS traffic routed through Cloudflare Tunnel.

## License

Released under the [MIT License](LICENSE).
