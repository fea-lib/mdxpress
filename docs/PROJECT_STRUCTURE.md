# 🏗️ Project Structure

This document outlines the file structure and workflow of the MDXpress repository, including the app template, documentation, scripts, generated files, and symlink strategy.

## Repository Structure

```
mdxpress/
├── README.md                     # Main project documentation (symlink to app-template/README.md)
├── LICENSE                       # MIT license
├── .gitignore                    # Git ignore patterns
├── test-cli.sh                   # Test script for CLI functionality
├── .github/                      # GitHub Actions and workflows
│   └── workflows/
│       └── deploy.yml            # GitHub Pages deployment workflow
├── docs/                         # Project documentation and research
│   ├── README.md                 # Symlink to app-template/README.md
│   ├── CHANGELOG.md              # Project changelog (symlink to app-template/CHANGELOG.md)
│   ├── PROJECT_STRUCTURE.md          # This file - project structure documentation
│   ├── IDEA.md                   # Project concept documentation
│   └── pocs/                     # Proof of concepts and experiments
│       ├── docusaurus/           # Docusaurus POC implementation
│       ├── starlight/            # Starlight (Astro) POC implementation
│       └── vite/                 # Vite POC implementation
├── app-template/                 # The app template that gets copied to users
│   ├── package.json              # Template dependencies and scripts
│   ├── package-lock.json         # Locked dependency versions
│   ├── vite.config.ts            # Vite configuration with MDX support
│   ├── tsconfig.json             # TypeScript configuration
│   ├── tsconfig.node.json        # Node.js TypeScript configuration
│   ├── docs.config.json          # Docs directory configuration
│   ├── index.html                # HTML entry point
│   ├── .gitignore                # Template Git ignore patterns
│   ├── README.md                 # Template documentation (source of truth)
│   ├── CHANGELOG.md              # Template changelog (source of truth)
│   ├── scripts/                  # Project scripts
│   │   ├── mdx-validate.cjs      # Main script to validate/filter MDX files and generate artifacts
│   ├── src/                      # Source code
│   │   ├── main.tsx              # React app entry point
│   │   ├── App.tsx               # Main application component
│   │   ├── index.css             # Global styles
│   │   ├── vite-env.d.ts         # Vite type definitions
│   │   ├── docs -> ../example-docs # Symlink to example documentation
│   │   ├── components/           # React components
│   │   ├── contexts/             # React contexts
│   │   ├── lib/                  # Utility functions
│   │   └── generated/            # Generated files for MDX filtering and imports
│   │       ├── invalidMdxFiles.json         # List of invalid MDX files (relative paths)
│   │       ├── validMdxFiles.json           # List of valid MDX files (relative paths)
│   │       ├── validMdxFiles.json.d.ts      # TypeScript type declaration for validMdxFiles.json
│   │       └── validMdxGlobs.generated.ts   # Import object for valid MDX files (used by loader)
│   ├── example-docs/             # Example documentation content
│   │   ├── README.md             # Documentation overview
│   │   ├── CHANGELOG.md          # Example changelog documentation
│   │   ├── PROJECT_STRUCTURE.md  # Example project structure docs
│   │   ├── IDEA.md               # Project concept documentation
│   │   └── advanced/             # Advanced examples directory
│   │       ├── getting-started.mdx # Getting started guide
│   │       └── sub/              # Nested documentation example
│   │           └── examples.mdx  # Nested examples file
│   ├── public/                   # Static assets
│   │   └── vite.svg              # Vite logo
│   └── node_modules/             # Installed dependencies (not tracked in git)
├── cli/                          # CLI scripts for project setup
│   ├── setup.sh                  # Bash setup script (Linux/macOS)
│   └── setup.bat                 # Batch setup script (Windows)
```

## Key Workflow and Automation

- **MDX Validation & Filtering:**
  - `scripts/mdx-validate.cjs` scans all MDX files in `src/docs/`, validates imports and syntax, and generates artifacts in `src/generated/`.
  - This script runs automatically before every dev/build via `predev`/`prebuild` npm scripts.
  - Only valid MDX files are included in the build; invalid files are ignored.
- **Symlink Strategy:**
  - `README.md` and `CHANGELOG.md` at the repo root and in `docs/` are symlinks to the `app-template/` versions (single source of truth).
  - `src/docs` is a symlink to `example-docs/` for development convenience.
- **.gitignore:**
  - All files in `src/generated/` are gitignored except for `*.d.ts` type declarations, which are kept for TypeScript support.

## Main Components & Configuration

- **Navigation.tsx**: Generates navigation from MDX files in the docs directory
- **DocPage.tsx**: Renders documentation pages with MDX compilation
- **CodePlayground.tsx**: Interactive code execution using Sandpack
- **ThemeToggle.tsx**: Dark/light theme switching
- **ThemeContext.tsx**: React context for theme state
- **docs.config.json**: Configures docs directory location and metadata
- **vite.config.ts**: Handles MDX compilation, path aliases, and build config
- **tsconfig.json**: TypeScript config with MDX support and path mappings

## Development & Deployment

- **CLI scripts** for cross-platform setup and local/remote development
- **GitHub Actions** for CI/CD and GitHub Pages deployment
- **SPA routing** and symlink resolution during build

---

For more details, see comments in the relevant files or ask for a specific workflow explanation.
