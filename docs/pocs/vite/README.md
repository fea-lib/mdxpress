# Amelcraft Vite POC

This is a proof-of-concept implementation using Vite.js to render interactive documentation with live code execution. The POC demonstrates how to create interactive documents that are text-based, git-versionable, and enhanced with executable code snippets.

## Features

- **Vite.js** for fast development and build times
- **React** for component-based UI
- **MDX** for markdown with JSX components
- **Sandpack** for live code execution
- **TypeScript** for type safety
- **Phaser.js** integration for interactive game examples

## Interactive Code Examples

The document includes three interactive Phaser.js examples:

1. **Drag-to-Move Example**: Demonstrates drag-to-move controls with a blue square
2. **Block Placement Example**: Shows grid-based block placement mechanics
3. **Responsive Camera Zoom**: Illustrates adaptive camera zoom for different screen sizes

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to the displayed URL (typically `http://localhost:5173`)

## Build for Production

```bash
npm run build
```

## Technology Stack

- **Vite**: Fast build tool and development server
- **React**: UI library
- **MDX**: Markdown with JSX support
- **@codesandbox/sandpack-react**: Live code execution
- **TypeScript**: Type safety
- **Phaser.js**: Game engine for interactive examples

## Project Structure

```
src/
├── components/
│   └── PocContainer.tsx    # Sandpack wrapper component
├── docs/
│   └── amelcraft.mdx       # Main documentation content
├── pocs/
│   ├── dragToMove.js       # Drag-to-move example
│   ├── blockPlacement.js   # Block placement example
│   └── responsiveCameraZoom.js # Camera zoom example
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
├── index.css              # Global styles
└── vite-env.d.ts          # TypeScript declarations
```

## Key Features

### Fast Development
- Hot module replacement (HMR) for instant updates
- Fast builds with Vite's optimized bundling
- TypeScript support with quick type checking

### Interactive Documentation
- MDX allows mixing markdown content with React components
- Sandpack provides live code execution within the document
- Phaser.js examples demonstrate game development concepts

### Responsive Design
- Mobile-friendly layout
- Adaptive code examples that work on different screen sizes
- Clean, professional styling

## Comparison with Other Solutions

### Advantages of Vite POC:
- **Speed**: Fastest development and build times
- **Simplicity**: Minimal configuration required
- **Modern**: Uses latest web technologies
- **Flexibility**: Easy to customize and extend

### Considerations:
- Smaller ecosystem compared to Next.js
- Less built-in documentation features than Docusaurus/Starlight
- Manual setup for some advanced features

## Performance

- **Development**: Near-instant HMR updates
- **Build**: Optimized production bundles
- **Runtime**: Minimal JavaScript overhead
- **Code Execution**: Sandpack provides isolated execution environments

## Future Enhancements

- Add more interactive examples
- Implement search functionality
- Add navigation sidebar
- Include more Phaser.js game mechanics
- Add dark mode support
- Implement code syntax highlighting themes
