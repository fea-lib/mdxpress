# 🏗️ Project Structure

This document outlines the file structure of the MDXpress project.

## Repository Structure

```
mdxpress/
├── README.md                     # Main project documentation (symlink to app-template/)
├── CHANGELOG.md                  # Project changelog (symlink to app-template/)  
├── PROJECT_STRUCTURE.md          # This file - project structure documentation
├── LICENSE                       # MIT license
├── .gitignore                    # Git ignore patterns
├── test-cli.sh                   # Test script for CLI functionality
├── .github/                      # GitHub Actions and workflows
│   └── workflows/
│       └── deploy.yml            # GitHub Pages deployment workflow
├── docs/                         # Project documentation and research
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
│   ├── src/                      # Source code
│   │   ├── main.tsx              # React app entry point
│   │   ├── App.tsx               # Main application component
│   │   ├── index.css             # Global styles
│   │   ├── vite-env.d.ts         # Vite type definitions
│   │   ├── docs -> ../example-docs # Symlink to example documentation
│   │   ├── components/           # React components
│   │   │   ├── Navigation.tsx    # Navigation sidebar component
│   │   │   ├── DocPage.tsx       # Document page renderer
│   │   │   ├── ThemeToggle.tsx   # Dark/light theme toggle component
│   │   │   └── CodePlayground.tsx # Interactive code execution component
│   │   ├── contexts/             # React contexts
│   │   │   └── ThemeContext.tsx  # Theme context provider
│   │   └── lib/                  # Utility functions
│   │       └── docs.ts           # Document loading utilities
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

### Key Components

1. **Navigation.tsx**: Automatically generates navigation from MDX files in the docs directory
2. **DocPage.tsx**: Renders individual documentation pages with MDX compilation
3. **CodePlayground.tsx**: Handles interactive code execution using Sandpack
4. **ThemeToggle.tsx**: Provides dark/light theme switching functionality
5. **ThemeContext.tsx**: React context for managing theme state across components

### Configuration Files

- **docs.config.json**: Configures docs directory location and metadata
- **vite.config.ts**: Handles MDX compilation, path aliases, and build configuration
- **tsconfig.json**: TypeScript configuration with MDX support and path mappings

### Documentation Structure

The project uses a mixed approach for documentation organization:
- `README.md` and `CHANGELOG.md` at root are symlinks to `app-template/` versions (source of truth)
- `PROJECT_STRUCTURE.md` is maintained at the repository root level
- `src/docs` symlinks to `example-docs/` for development convenience
- This approach balances consistency with practical repository management

## CLI Features

### Cross-Platform Support
- **setup.sh**: Bash script for Linux/macOS with curl/wget support
- **setup.bat**: Batch script for Windows with PowerShell fallback
- **Local Development Mode**: Automatically detects local vs remote execution
- **test-cli.sh**: Automated testing script for CLI functionality

### User Experience
- Interactive prompts for project and documentation directory configuration
- Automatic dependency detection and installation
- Clear setup instructions with progress indicators
- Graceful error handling with helpful error messages
- Support for both local and remote template copying

## Deployment & CI/CD

### GitHub Pages Integration
- **deploy.yml**: GitHub Actions workflow for automated deployment
- Automatic build and deployment on push to main branch
- Symlink resolution during build process
- SPA routing support with 404.html fallback
- Live demo deployment to `https://fea-lib.github.io/mdxpress`

## Development Patterns

### For End Users
1. Run setup script via curl/wget or manual download
2. Configure target directory and documentation location
3. Install dependencies and start development server
4. Write MDX documentation with interactive code examples
5. Build and deploy static site to any hosting platform

### For Project Maintainers
1. Clone repository for local development
2. Modify `app-template/` files as the source of truth
3. Test changes using `test-cli.sh` script
4. Update CLI scripts for new features or improvements
5. Document changes in `app-template/CHANGELOG.md`

## Extension Points

The app-template is designed for full customization:

- **Styling**: Modify `src/index.css` or integrate CSS frameworks
- **Components**: Add custom React components in `src/components/`
- **Routing**: Extend routing logic in `src/App.tsx`
- **Build Process**: Customize `vite.config.ts` for specific needs
- **Documentation Structure**: Organize MDX files as needed in docs directory
- **Theming**: Extend `ThemeContext.tsx` for additional theme options

## Architecture Philosophy

### Zero Lock-in Approach
Following the shadcn/ui distribution model:
- No npm package dependency to maintain
- Direct template copying via CLI scripts
- Users own the complete codebase after setup
- Zero ongoing dependencies or forced updates
- Full customization freedom without restrictions

### Symlink Strategy
- Eliminates file duplication across the repository
- Maintains single source of truth for documentation
- Simplifies maintenance and reduces sync issues
- Enables consistent documentation across all contexts
