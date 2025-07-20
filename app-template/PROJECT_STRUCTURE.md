# 🏗️ Project Structure

This document outlines the complete structure of the MDXpress project.

## Repository Structure

```
mdxpress/
├── README.md                # Main project documentation
├── LICENSE                  # MIT license
├── docs/                    # Project documentation (this folder)
│   └── README.md            # Project overview and planning docs
├── app-template/            # The app-template that gets copied to users
│   ├── package.json         # Template dependencies and scripts
│   ├── vite.config.ts       # Vite configuration with MDX support
│   ├── tsconfig.json        # TypeScript configuration
│   ├── tsconfig.node.json   # Node.js TypeScript configuration
│   ├── docs.config.json     # Docs directory configuration
│   ├── index.html           # HTML entry point
│   ├── README.md            # Template documentation
│   ├── src/                 # Source code
│   │   ├── main.tsx         # React app entry point
│   │   ├── App.tsx          # Main application component
│   │   ├── index.css        # Global styles
│   │   ├── vite-env.d.ts    # Vite type definitions
│   │   ├── components/      # React components
│   │   │   ├── Navigation.tsx     # Navigation sidebar
│   │   │   ├── HomePage.tsx       # Home page component
│   │   │   ├── DocPage.tsx        # Document page renderer
│   │   │   └── CodePlayground.tsx # Interactive code component
│   │   └── lib/             # Utility functions
│   │       └── docs.ts      # Document loading utilities
│   ├── docs/                # Example documentation
│   │   ├── getting-started.mdx    # Getting started guide
│   │   └── advanced-examples.mdx  # Advanced examples
│   └── public/              # Static assets
│       └── vite.svg         # Vite logo
├── cli/                     # CLI scripts for setup
│   ├── setup.sh             # Bash setup script (Linux/macOS)
│   └── setup.bat            # Batch setup script (Windows)
└── test-cli.sh              # Test script for CLI functionality
```

## Template Features

### Core Technologies
- **Vite**: Fast build tool and development server
- **React**: UI library for components
- **MDX**: Markdown with embedded React components
- **TypeScript**: Type safety throughout
- **React Router**: Client-side routing
- **Sandpack**: Interactive code execution

### Key Components

1. **Navigation.tsx**: Automatically generates navigation from MDX files
2. **DocPage.tsx**: Renders individual documentation pages
3. **CodePlayground.tsx**: Handles interactive code execution
4. **HomePage.tsx**: Landing page with feature overview

### Configuration

- **docs.config.json**: Configures docs directory and metadata
- **vite.config.ts**: Handles MDX compilation and path aliases
- **tsconfig.json**: TypeScript configuration with MDX support

## CLI Features

### Cross-Platform Support
- **setup.sh**: Bash script for Linux/macOS
- **setup.bat**: Batch script for Windows
- **Local Development Mode**: Automatically detects local vs remote execution

### User Experience
- Interactive prompts for configuration
- Automatic dependency detection
- Clear setup instructions
- Graceful error handling
- Progress indicators

## Usage Patterns

### For End Users
1. Run setup script via curl/wget or manual download
2. Configure target directory and docs location
3. Install dependencies and start development
4. Write MDX documentation with interactive examples

### For Developers
1. Clone repository for local development
2. Modify app-template files as needed
3. Test changes with `test-cli.sh`
4. Update CLI scripts for new features

## Extension Points

The app-template is designed to be fully customizable:

- **Styling**: Modify `src/index.css` or add CSS frameworks
- **Components**: Add custom React components
- **Routing**: Extend routing in `src/App.tsx`
- **Build Process**: Customize `vite.config.ts`
- **Documentation Structure**: Organize MDX files as needed

## Distribution Strategy

Following the shadcn/ui model:
- No npm package to maintain
- Direct app-template copying via CLI
- Users own the complete codebase
- Zero ongoing dependencies or updates required
