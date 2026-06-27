# WWTT — Wastewater Treatment Digital Twin Platform

A digital twin platform for wastewater treatment plant monitoring, IoT device management, and predictive maintenance, with Gemini-powered AI insights.

## Sections

- **Dashboard** — real-time plant KPIs and flow rate trend.
- **Digital Twin** — live status and health score of plant assets.
- **IoT Management** — connected sensor fleet status.
- **Predictive Maintenance** — failure risk forecasts with AI-generated explanations.
- **Solution Configurator** — build and estimate a deployment package.
- **Resources** — documentation and guides.

## Development

```bash
npm install
npm run dev
```

Set `GEMINI_API_KEY` in a `.env.local` file to enable AI insights in Predictive Maintenance.

## Build

```bash
npm run build
npm run preview
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app and deploys it to GitHub Pages. Set the `GEMINI_API_KEY` repository secret to enable AI features in production. Enable GitHub Pages with source "GitHub Actions" in repo settings.
