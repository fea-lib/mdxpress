# Changelog

All notable changes to MDXpress will be documented in this file.

## [1.2.0] - 2025-07-20

### Added
- **GitHub Pages Deployment**: Automated deployment to GitHub Pages on push to main branch
  - Complete CI/CD pipeline with GitHub Actions
  - Automatic symlink resolution during build process
  - SPA routing support with 404.html fallback
  - Live demo available at: https://fea-lib.github.io/mdxpress

### Fixed
- **MDX Production Compilation**: Resolved JavaScript runtime errors in production builds
  - Fixed MDX plugin configuration for production environments
  - Added proper JSX runtime configuration (`jsxRuntime: "automatic"`)
  - Conditional development mode setting based on NODE_ENV
- **Direct URL Access**: Fixed 404 errors when refreshing or directly accessing document URLs
  - Added 404.html that serves the React app for any missing route
  - Enables bookmarking and sharing of direct document links
  - Maintains proper base path handling for GitHub Pages deployment

## [1.1.1] - 2025-07-20

### Changed
- **File Structure Optimization**: Restructured documentation file organization for better maintainability
  - Moved `README.md`, `CHANGELOG.md`, and `PROJECT_STRUCTURE.md` to `app-template/` as source of truth
  - Created symlinks from repository root to `app-template/` versions
  - Created symlinks from `example-docs/` to `app-template/` versions
  - Eliminated circular symlink dependencies that were causing development server errors

### Fixed
- Resolved `ELOOP: too many symbolic links` error during development server startup
- Fixed circular symlink references between root and example documentation files

## [1.0.0] - 2025-07-17

### Added
- Initial release of MDXpress
- Complete Vite+MDX+React template
- Cross-platform CLI scripts (bash and batch)
- Interactive code execution with Sandpack
- Responsive documentation layout
- Configurable docs directory support
- Example documentation with advanced use cases
- TypeScript support throughout
- Local development mode for CLI testing

### Features
- 🚀 Interactive code examples with live execution
- 📝 MDX support for rich documentation
- ⚡ Fast development with Vite
- 🎨 Fully customizable styling and components
- 📱 Responsive design for all devices
- 🔧 Configurable docs directory structure
- 📦 Zero lock-in philosophy - you own the code
- 🌐 Deploy anywhere with static build

### Technical Implementation
- React 18 with TypeScript
- Vite 4 with HMR support
- MDX 2 with React components
- React Router for client-side routing
- Sandpack for interactive code execution
- Comprehensive CSS styling system
- Automatic document discovery and navigation

### CLI Tools
- Bash script for Linux/macOS
- Batch script for Windows
- Local development mode detection
- Interactive setup prompts
- Automatic app-template copying and configuration
- Clear setup instructions and error handling
