# GitHub Pages Deployment

This repository is configured to automatically deploy the `app-template` to GitHub Pages when changes are pushed to the `main` branch.

## How it works

1. **Trigger**: The deployment is triggered on push to `main` branch when files in the `app-template/` directory are changed
2. **Build**: The workflow installs dependencies and builds the app using `npm run build`
3. **Deploy**: The built files from `app-template/dist/` are deployed to GitHub Pages

## Manual Deployment

You can also trigger a deployment manually by going to the Actions tab in GitHub and running the "Deploy Template App to GitHub Pages" workflow.

## Configuration

The deployment is configured in `.github/workflows/deploy.yml` and uses:
- Node.js 18
- Vite build system
- GitHub Pages deployment action

The app is configured to work with the correct base path (`/mdxpress/`) in production via the Vite config.

## Accessing the Deployed App

Once deployed, the app will be available at: https://fea-lib.github.io/mdxpress/
