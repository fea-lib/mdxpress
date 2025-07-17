# Docusaurus Interactive Documentation POC

This is a proof-of-concept implementation of interactive documentation using Docusaurus with Sandpack for live code execution.

## Features

- **Docusaurus Framework**: Full-featured documentation site with navigation, search, and theming
- **Interactive Code Execution**: Live JavaScript/TypeScript code execution using Sandpack
- **Phaser.js Support**: Pre-configured environment for game development examples
- **TypeScript Support**: Full TypeScript support throughout the project
- **Responsive Design**: Mobile-friendly interface with adaptive layouts

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd docusaurus
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

To build the site for production:

```bash
npm run build
```

To serve the built site locally:

```bash
npm run serve
```

## Project Structure

```
docusaurus/
├── docs/
│   ├── amelcraft.mdx          # Main interactive documentation
│   └── pocs/                  # Interactive code examples
│       ├── PocContainer.tsx   # Custom Sandpack component for POCs
│       ├── dragToMove.js      # Drag-to-move example
│       ├── blockPlacement.js  # Block placement example
│       ├── responsiveCameraZoom.js  # Camera zoom example
│       └── amelcraftMiniGame.js     # Complete mini-game example
├── src/
│   └── pages/
│       └── index.tsx          # Homepage
├── docusaurus.config.ts       # Docusaurus configuration
└── package.json
```

## Key Components

### PocContainer Component

The `PocContainer` component (`docs/pocs/PocContainer.tsx`) provides:

- Pre-configured Phaser.js environment with HTML container
- Live code editing and execution
- Error handling and console output
- Responsive layout optimized for game development
- Custom HTML template for Phaser.js games

Usage in MDX files:
```mdx
<PocContainer
  title="Example Title"
  codeFile="dragToMove.js"
/>
```

### Interactive Code Examples

The project includes several interactive code examples in `docs/pocs/`:

- **dragToMove.js**: Demonstrates drag-to-move character controls
- **blockPlacement.js**: Shows grid-based block placement mechanics
- **responsiveCameraZoom.js**: Illustrates responsive camera zoom functionality
- **amelcraftMiniGame.js**: Complete mini-game combining all features

### Interactive Documentation

The main documentation is in `docs/amelcraft.mdx`. This file contains:

- Interactive code examples using the PocContainer component
- Proper MDX syntax for combining Markdown with React components
- Pre-configured examples for drag-and-drop, block placement, and camera controls
- External code file references for better organization and maintainability

## Code Organization

The interactive examples are organized as separate JavaScript files in `docs/pocs/`:

- **Modular Structure**: Each example is a standalone JavaScript file
- **Easy Maintenance**: Code can be edited independently of documentation
- **Reusability**: Examples can be referenced multiple times across different docs
- **Version Control**: Code changes are tracked separately from documentation updates

## Completing the POC

The POC has been completed with the following implementations:

1. **Content Integration**: The `docs/amelcraft.mdx` contains the full interactive documentation
2. **Code Externalization**: All JavaScript code has been moved to external files in `docs/pocs/`
3. **Component Implementation**: The `PocContainer` component handles all interactive examples
4. **File Organization**: Clean separation between documentation and code examples
5. **Working Examples**: All interactive examples are functional and responsive

## Current State

The project is now fully functional with:

- ✅ Interactive drag-to-move examples
- ✅ Block placement mechanics
- ✅ Responsive camera zoom demonstrations
- ✅ Complete mini-game implementation
- ✅ External code file management
- ✅ Proper MDX integration

## Development Workflow

1. **Hot reload**: The development server supports hot reloading for both content and components
2. **Error handling**: Build-time errors are displayed in the browser during development
3. **Component testing**: Test the PocContainer component with different code examples
4. **MDX validation**: Ensure proper MDX syntax for component integration
5. **External file editing**: Edit code examples in `docs/pocs/` and see changes immediately

## Performance Considerations

- **Code splitting**: Docusaurus automatically splits code for optimal loading
- **Sandpack optimization**: Interactive examples are loaded on-demand
- **Static generation**: Site is pre-built for optimal performance
- **SEO friendly**: Built-in SEO optimization and meta tag support
- **External file caching**: Code examples are cached for better performance

## Customization Options

- **Theming**: Modify `docusaurus.config.ts` and CSS files for custom styling
- **Component enhancement**: Extend the PocContainer component with additional features
- **Plugin integration**: Add Docusaurus plugins for enhanced functionality
- **Configuration**: Adjust build settings and deployment options
- **Code examples**: Add new interactive examples in the `docs/pocs/` directory

## Deployment

The site can be deployed to various platforms:

- **GitHub Pages**: Built-in GitHub Pages deployment support
- **Netlify**: Direct deployment from repository
- **Vercel**: Automatic deployment with git integration
- **Traditional hosting**: Build and deploy static files

## Testing

Run the site locally to test:

1. All interactive code examples execute properly
2. Navigation and search functionality work
3. Mobile responsiveness is maintained
4. Performance is acceptable for the target audience
5. External code files load correctly
6. PocContainer component renders all examples

## Next Steps

1. ✅ ~~Add the actual Amelcraft documentation content~~
2. ✅ ~~Implement additional interactive examples~~
3. Add search functionality configuration
4. Set up automated deployment
5. Add analytics and monitoring
6. Create additional game development examples
7. Implement code syntax highlighting improvements

## Troubleshooting

- **Build errors**: Check the console for MDX syntax errors
- **Component issues**: Verify PocContainer component props and file paths
- **Performance**: Monitor bundle size and loading times
- **Browser compatibility**: Test across different browsers and devices
- **File loading errors**: Ensure code files exist in `docs/pocs/` directory
- **Sandpack issues**: Check browser console for Sandpack-related errors
