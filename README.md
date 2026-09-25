# Headway Oxford Online Practice

Interactive practice and gradebook platform for Oxford Headway 5th Edition.

## Deploying to Vercel

This project is pre-configured for seamless, zero-config deployment to [Vercel](https://vercel.com):

### Option 1: Via GitHub / Git Repository (Recommended)
1. Push this repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com/new), select **Add New Project** and import the repository.
3. Vercel will automatically detect the **Vite** framework preset:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Click **Deploy**.

### Option 2: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

### Included Configuration
- `vercel.json` is configured with SPA rewrites (`/(.*) -> /index.html`) so route refreshes and deep links resolve seamlessly without 404 errors.
- Clean TypeScript build and optimized Tailwind CSS asset bundling.
