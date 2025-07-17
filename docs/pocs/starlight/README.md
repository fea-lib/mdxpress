# Starlight Interactive Documentation POC

This is a proof of concept for creating interactive documentation using Starlight, MDX, and @codesandbox/sandpack-react.

## Features

- **Starlight**: Modern documentation framework built on Astro
- **MDX**: Markdown with React components
- **Sandpack**: Interactive code playgrounds
- **TypeScript**: Full type safety
- **Modern UI**: Clean and responsive design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:4321`

## Project Structure

```
src/
├── components/
│   └── CodePlayground.tsx    # Sandpack wrapper component
├── content/
│   └── docs/
│       ├── index.mdx         # Homepage
│       └── guides/
│           ├── getting-started.md
│           └── interactive-code.mdx
└── assets/
    └── hero-image.svg        # Hero image for homepage
```

## Usage

The `CodePlayground` component can be used in any MDX file:

```mdx
import CodePlayground from '../../../components/CodePlayground.tsx';

<CodePlayground 
  template="react"
  files={{
    '/App.js': `// Your React code here`
  }}
/>
```

## Templates

Supported Sandpack templates:
- `react` - React with JSX
- `vanilla` - Plain JavaScript/HTML/CSS
- `vue` - Vue.js
- `angular` - Angular

## Customization

You can customize the Sandpack playground by modifying the `CodePlayground` component options:

- `showNavigator`: Show file navigator
- `showTabs`: Show file tabs
- `showLineNumbers`: Show line numbers
- `editorHeight`: Set editor height
- `theme`: Set theme (light/dark/auto)

## Building

To build the site for production:

```bash
npm run build
```

## Preview

To preview the built site:

```bash
npm run preview
```