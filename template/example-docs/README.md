# Interactive Documentation

This is your interactive documentation app, powered by Vite, MDX, and React.

## Features

- 🚀 **Interactive Code Examples**: Live code execution with Sandpack
- 📝 **MDX Support**: Write documentation in MDX format
- ⚡ **Fast Development**: Powered by Vite
- 🎨 **Customizable**: Full control over styling and functionality
- 📱 **Responsive**: Works on all devices

## Getting Started

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Writing Documentation

1. Create `.mdx` files in your `docs` directory
2. Add frontmatter with a title:
   ```mdx
   ---
   title: Your Page Title
   ---
   ```
3. Write your content using Markdown and React components
4. Use the `Sandpack` component for interactive code examples

## Interactive Code Examples

Import Sandpack and use it to create interactive code examples:

```mdx
import { Sandpack } from '@codesandbox/sandpack-react'

<Sandpack
  template="react-ts"
  files={{
    "/App.tsx": `export default function App() {
      return <h1>Hello World!</h1>
    }`
  }}
  options={{
    showNavigator: false,
    showTabs: false,
    showLineNumbers: true,
    editorHeight: 300
  }}
/>
```

## Configuration

The docs directory can be configured in `docs.config.json`:

```json
{
  "docsDir": "docs",
  "title": "Interactive Documentation",
  "description": "Interactive documentation with MDX and React"
}
```

## Customization

- **Styling**: Edit `src/index.css` or add your own CSS files
- **Components**: Add custom components in `src/components/`
- **Layout**: Modify `src/App.tsx` and related components
- **Navigation**: Customize `src/components/Navigation.tsx`

## Deployment

Build the app and deploy the `dist` folder to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any other static hosting provider

## Technology Stack

- **Vite**: Build tool and development server
- **React**: UI library
- **MDX**: Markdown with React components
- **React Router**: Client-side routing
- **Sandpack**: Interactive code execution
- **TypeScript**: Type safety

## Need Help?

- Check the example documents in the `docs` folder
- Refer to the [MDX documentation](https://mdxjs.com/)
- Learn more about [Sandpack](https://sandpack.codesandbox.io/)
