# 📝 MDXpress - Interactive Documentation CLI

A copy-in CLI tool that scaffolds a customizable Vite+MDX+React documentation app into any project. Inspired by the shadcn/ui approach, this tool gives you full ownership of your documentation code with zero lock-in.

## 🚀 Quick Start

### Using curl (recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/fea-lib/mdxpress/main/cli/setup.sh | bash
```

### Using wget

```bash
wget -qO- https://raw.githubusercontent.com/fea-lib/mdxpress/main/cli/setup.sh | bash
```

### Manual Download

Download and run the setup script for your platform:

- **Linux/macOS**: [setup.sh](https://raw.githubusercontent.com/fea-lib/mdxpress/main/cli/setup.sh)
- **Windows**: [setup.bat](https://raw.githubusercontent.com/fea-lib/mdxpress/main/cli/setup.bat)

## ✨ Features

- 🚀 **Interactive Code Examples**: Live TypeScript/JavaScript execution with provided `CodePlayground` component
- 📝 **MDX Support**: Write documentation in MDX format with React components
- ⚡ **Fast Development**: Powered by Vite for instant hot reload
- 🎨 **Fully Customizable**: Own the code, modify anything you want
- 📱 **Responsive Design**: Works perfectly on all devices
- 🔧 **Configurable**: Specify any docs directory structure
- 📦 **Zero Lock-in**: Copy the code and make it yours
- 🌐 **Deploy Anywhere**: Static build works with any hosting provider

## 🎯 Perfect For

- Software project documentation
- Educational content with live code examples
- API documentation with interactive examples
- Component libraries and design systems
- Technical tutorials and guides

## 📋 What You Get

The CLI copies a complete Vite+MDX+React application to your project:

```
root/
├── your-docs/
│   └── **/*.md(x)              # Your actual documentation files
├── your-docs-app/              # Configurable via CLI
│   ├── package.json            # Dependencies and scripts
│   ├── vite.config.ts          # Vite configuration with MDX support
│   ├── tsconfig.json           # TypeScript configuration
│   ├── tsconfig.node.json      # Node.js TypeScript configuration
│   ├── docs.config.json        # Docs directory configuration
│   ├── index.html              # Entry HTML file
│   ├── src/
│   │   ├── main.tsx            # React app entry point
│   │   ├── App.tsx             # Main application component
│   │   ├── index.css           # Global styles
│   │   ├── vite-env.d.ts       # Vite type definitions
│   │   ├── components/         # React components
│   │   ├── contexts/           # React contexts (theme, etc.)
│   │   ├── docs/               # Symlink to your documentation files
│   │   └── lib/                # Utility functions
│   └── public/                 # Static assets
```

## 🛠️ Usage

1. **Run the setup script** (see Quick Start above)
2. **Configure your setup** when prompted:
   - Target directory for the docs app
   - Source directory for your documentation files
3. **Install dependencies**:
   ```bash
   cd your-docs-app
   npm install
   ```
4. **Start developing**:
   ```bash
   npm run dev
   ```

## 📖 Writing Documentation

Create `.mdx` files in your docs directory:

```mdx
# Getting Started

Here's an interactive React example using the CodePlayground component:

<CodePlayground
  template="react-ts"
  files={{
    "/App.tsx": `export default function App() {
      return <h1>Hello Interactive Docs!</h1>
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

## ⚙️ Configuration

The CLI handles all configuration during setup:

- **Target directory**: Choose where to create your documentation app
- **Source directory**: Specify where your existing documentation files are located
- **Automatic symlink**: The CLI creates a symlink from `src/docs/` to your actual documentation directory

The setup creates a seamless connection between your existing docs and the interactive app, so you can keep your documentation files in their original location while powering them with the MDXpress interface.

## 🎨 Customization

Since you own the code, you can customize everything:

- **Styling**: Edit `src/index.css` or add your own CSS
- **Components**: Create custom components in `src/components/`
- **Layout**: Modify `src/App.tsx` and navigation
- **Build process**: Update `vite.config.ts`
- **Routes**: Add new routes in `src/App.tsx`

## 🚢 Deployment

Build for production and deploy anywhere:

```bash
npm run build
```

Deploy the `dist` folder to:
- Vercel
- Netlify  
- GitHub Pages
- AWS S3
- Any static hosting provider

## 🏗️ Architecture

**Content Layer**:
- Source documents in Markdown/MDX format
- Interactive code snippets with Sandpack
- Configurable docs directory structure

**Processing Layer**:
- Vite build system with HMR
- MDX compilation with React components
- TypeScript support throughout

**Presentation Layer**:
- React-based responsive UI
- Client-side routing with React Router
- Customizable styling and theming

## 🤝 Contributing

This project follows the "copy-in" philosophy. The app-template is designed to be copied and customized, not updated through a package manager.

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Inspired by [shadcn/ui](https://ui.shadcn.com/)'s copy-in approach
- Powered by [Vite](https://vitejs.dev/), [MDX](https://mdxjs.com/), and [Sandpack](https://sandpack.codesandbox.io/)
- Built for the developer community who values ownership and flexibility

---

**Ready to create interactive documentation?** Run the setup script and start documenting! 🚀