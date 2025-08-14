# 🏗️ Project Structure

This document outlines the file structure and workflow of the MDXpress repository, including the app template, documentation, scripts, generated files, and symlink strategy.

## Repository Structure

```
mdxpress/
├── README.md                     # Main project documentation (symlink to app-template/README.md)
├── LICENSE                       # MIT license
├── .gitignore                    # Git ignore patterns
├── .github/                      # GitHub Actions and workflows
│   └── workflows/
│       └── deploy.yml            # GitHub Pages deployment workflow
├── docs/                         # Project documentation and research
│   ├── README.md                 # Symlink to app-template/README.md
│   ├── CHANGELOG.md              # Project changelog (symlink to app-template/CHANGELOG.md)
│   ├── PROJECT_STRUCTURE.md      # This file - project structure documentation
│   ├── IDEA.md                   # Project concept documentation
│   └── pocs/                     # Proof of concepts and experiments
│       ├── docusaurus/           # Docusaurus POC implementation
│       ├── starlight/            # Starlight (Astro) POC implementation
│       └── vite/                 # Vite POC implementation
├── app-template/                 # The app template that gets copied to users
│   ├── example-docs/             # Example documentation
│   ├── public/                   # Static assets (served as-is)
│   ├── src/                      # Main Astro application source code
│   │   ├── components/           # Astro and React components (for interactive/MDX code)
│   │   ├── content/              # Astro configuration from where to gather the documents
│   │   ├── pages/                # Astro page routes (including dynamic docs routing)
│   │   ├── styles/               # Global and component CSS
│   │   ├── types/                # All globally used types
│   │   └── utils/                # All globally used utilities
│   └── tests/                    # Unit tests
└── cli/                          # CLI scripts for project setup
    ├── setup.sh                  # Bash setup script (Linux/macOS)
    └── setup.bat                 # Batch setup script (Windows)
```

## Main Components & Configuration

- **Navigation.tsx**: Reads the Astro `docs` collection and creates a navigation from them
- **Code.tsx**: Interactive code execution using Sandpack
- **ThemeToggle.tsx**: Dark/light theme switching
- **astro.config.ts**: Handles MDX compilation and build config
- **tsconfig.json**: TypeScript config with MDX support and path mappings

## Development & Deployment

- **CLI scripts** for cross-platform setup and local/remote development
- **GitHub Actions** for CI/CD and GitHub Pages deployment
- **SPA routing** and symlink resolution during build

---

For more details, see comments in the relevant files or ask for a specific workflow explanation.
