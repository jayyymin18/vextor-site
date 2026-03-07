# Vextor Website (React + Vite + Tailwind)

A modern, deployable website for **Vextor** with light/dark mode, routing, and a Salesforce Partner banner.

## Tech
- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Framer Motion
- Lucide Icons

## Local Dev
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy (Netlify)
1. Push this folder to GitHub.
2. On Netlify: **New site from Git**, pick the repo.
3. Build Command: `npm run build`
   Publish Directory: `dist`
4. Deploy.

## Deploy (Vercel)
1. Push to GitHub.
2. On Vercel: **New Project** → Import the repo.
3. Framework Preset: Vite.
4. Build Command: `npm run build`
   Output Directory: `dist`
5. Deploy.

## Notes
- The Salesforce Partner banner is referenced from an external URL:
  `https://www.odigo.com/wp-content/uploads/2022/06/SALESFORCE-PARTNER.png`
  You may replace it with an official asset if needed.
