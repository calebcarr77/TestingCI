# React + TypeScript + Vite — CI/CD to GitHub Pages

A minimal **CI/CD pipeline** for a React + Vite + TypeScript app, automatically deployed to **GitHub Pages** via **GitHub Actions**.

---

## Prerequisites

- Node.js 18+ (or 20+)
- Yarn or npm

---

## Quick Start (Local)

```bash
# Clone the starter
git clone https://github.com/holahmide/cicd_starter.git

# Detach from the original remote (optional)
cd cicd_starter
git remote remove origin

# Install & run
yarn        # or: npm install
yarn dev    # or: npm run dev
```

---

## Configuration for **GitHub Pages**

1. **Set the Vite `base` path**

   Open `vite.config.ts` and set `base` to your repo name (with leading/trailing slashes):

   ```ts
   // vite.config.ts
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     // If your site will be at https://<user>.github.io/<repo>/
     base: '/<your-repo-name>/',
   });
   ```

   > If you’re using a **User/Org page** at `https://<user>.github.io/`, set `base: "/"`.

2. **Enable GitHub Pages**
   - Go to your repo → **Settings** → **Pages**
   - Set **Source** to **GitHub Actions** (recommended)
   - Save

---

## CI/CD — What Happens on Push

- The GitHub Actions workflow:
  1. Checks out your code
  2. Installs dependencies
  3. Builds the app with Vite
  4. Uploads the `dist/` artifact
  5. Deploys to **GitHub Pages**

> Tip: You can preview locally with `yarn build && npx vite preview`.

---

## Troubleshooting

- **Blank page on GitHub Pages**  
  Ensure `base` in `vite.config.ts` matches your repo name (e.g., `/my-repo/`).

- **404 on refresh / deep link**  
  Add `404.html` in `dist` (copy of `index.html`) during deploy, or switch to `HashRouter`.

- **Assets not loading**  
  Avoid hard-coded absolute URLs; let Vite handle paths after setting `base`.

---

## Resources

- GitHub Actions — _Understand GitHub Actions_  
  https://docs.github.com/en/actions/get-started/understand-github-actions
- GitHub Action — _Upload GitHub Pages Artifact_  
  https://github.com/marketplace/actions/upload-github-pages-artifact

---

## Notes

- After you create your GitHub repository, **commit & push** this project.
- The CI will run automatically on push to your default branch (usually `main`).
- You can customize the workflow name, triggers, and Node version as needed.
