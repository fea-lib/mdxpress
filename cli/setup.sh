#!/bin/bash

# Interactive Documentation Setup Script
# Inspired by shadcn/ui approach

set -e

echo "🚀 Interactive Documentation Setup"
echo "=================================="
echo ""

# Check if curl is available
if ! command -v curl &> /dev/null; then
    echo "❌ Error: curl is required but not installed."
    exit 1
fi

# Check if tar is available
if ! command -v tar &> /dev/null; then
    echo "❌ Error: tar is required but not installed."
    exit 1
fi

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is required but not installed."
    echo "Please install Node.js 18.0.0 or higher from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | sed 's/v//')
echo "✅ Node.js version $NODE_VERSION detected"

# Simple version check - extract major version number
NODE_MAJOR=$(echo $NODE_VERSION | cut -d. -f1)
if [ "$NODE_MAJOR" -lt 18 ]; then
    echo "❌ Error: Node.js $NODE_VERSION is too old. Version 18.0.0 or higher is required."
    echo "Please update Node.js from https://nodejs.org/"
    exit 1
fi

# Check npm version
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is required but not installed."
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✅ npm version $NPM_VERSION detected"

# Default values
DEFAULT_TARGET_DIR="docs-app"
DEFAULT_DOCS_DIR="docs"
REPO_URL="https://github.com/fea-lib/mdxpress/archive/refs/heads/main.tar.gz"

# Check if we're running locally (for development)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$SCRIPT_DIR/../app-template/package.json" ]; then
    LOCAL_MODE=true
    TEMPLATE_PATH="$SCRIPT_DIR/../app-template"
    echo "🔧 Running in local development mode"
else
    LOCAL_MODE=false
    echo "🌐 Running in remote mode"
fi

echo "This script will set up an interactive documentation app in your project."
echo ""

# Prompt for target directory
read -p "📁 Enter the target directory [$DEFAULT_TARGET_DIR]: " TARGET_DIR
TARGET_DIR=${TARGET_DIR:-$DEFAULT_TARGET_DIR}

# Check if target directory already exists
if [ -d "$TARGET_DIR" ]; then
    echo ""
    echo "⚠️  Directory '$TARGET_DIR' already exists."
    read -p "Do you want to continue? This may overwrite existing files (y/N): " confirm
    case $confirm in
        [yY]|[yY][eE][sS])
            echo "Continuing..."
            ;;
        *)
            echo "Setup cancelled."
            exit 0
            ;;
    esac
fi

# Prompt for docs directory
echo ""
read -p "📚 Enter your docs source directory [$DEFAULT_DOCS_DIR]: " DOCS_DIR
DOCS_DIR=${DOCS_DIR:-$DEFAULT_DOCS_DIR}

echo ""
echo "📋 Setup Summary:"
echo "   Target directory: $TARGET_DIR"
echo "   Docs directory: $DOCS_DIR"
echo ""

read -p "Proceed with setup? (Y/n): " proceed
case $proceed in
    [nN]|[nN][oO])
        echo "Setup cancelled."
        exit 0
        ;;
    *)
        echo "Starting setup..."
        ;;
esac

echo ""
echo "📦 Downloading app-template..."

# Create temporary directory
TEMP_DIR=$(mktemp -d)
cleanup() {
    rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

if [ "$LOCAL_MODE" = true ]; then
    echo "📋 Using local app-template..."
    # Copy local app-template to temp directory, excluding git-ignored files
    mkdir -p "$TEMP_DIR/app-template"
    
    # Use rsync to copy files while respecting .gitignore
    if command -v rsync &> /dev/null; then
        echo "🔄 Copying files (excluding node_modules, dist, and other build artifacts)..."
        rsync -av --exclude-from="$TEMPLATE_PATH/.gitignore" \
              --exclude='.git' \
              --exclude='node_modules' \
              --exclude='package-lock.json' \
              --exclude='yarn.lock' \
              --exclude='src/docs' \
              --exclude='.env' \
              --exclude='dist' \
              --exclude='build' \
              "$TEMPLATE_PATH/" "$TEMP_DIR/app-template/"
    else
        # Fallback to cp with manual exclusions
        echo "🔄 Copying files (rsync not available, using cp with manual cleanup)..."
        cp -r "$TEMPLATE_PATH" "$TEMP_DIR/app-template-tmp"
        mv "$TEMP_DIR/app-template-tmp" "$TEMP_DIR/app-template"
        # Remove problematic directories/files
        rm -rf "$TEMP_DIR/app-template/node_modules" \
               "$TEMP_DIR/app-template/package-lock.json" \
               "$TEMP_DIR/app-template/yarn.lock" \
               "$TEMP_DIR/app-template/src/docs" \
                "$TEMP_DIR/app-template/.env" \
               "$TEMP_DIR/app-template/dist" \
               "$TEMP_DIR/app-template/build" \
               "$TEMP_DIR/app-template/.git" 2>/dev/null || true
    fi
else
    # Download and extract
    cd "$TEMP_DIR"
    curl -L "$REPO_URL" | tar xz --strip-components=1

    # Check if app-template directory exists
    if [ ! -d "app-template" ]; then
        echo "❌ Error: Template directory not found in download."
        exit 1
    fi
fi

echo "✅ Template ready."

# Copy app-template to target directory
echo "📋 Copying app-template to $TARGET_DIR..."
# Store the original directory and go back to it
ORIGINAL_DIR=$(pwd)

# The template is already prepared in TEMP_DIR/app-template, just move it
mv "$TEMP_DIR/app-template" "$TARGET_DIR"

# Clean up template-specific files immediately after copying
echo "🧹 Cleaning up template-specific configuration..."
cd "$ORIGINAL_DIR/$TARGET_DIR"

# Remove the existing symlink and config that point to example-docs
if [ -L "src/docs" ]; then
    rm "src/docs"
    echo "   Removed existing src/docs symlink"
fi
if [ -d "src/docs" ]; then
    rm -rf "src/docs"
    echo "   Removed existing src/docs directory"
fi

# Update docs configuration
echo "⚙️  Configuring docs directory..."

# Update docs.config.json - use relative path from app directory to docs directory
if [[ "$DOCS_DIR" = /* ]]; then
    # Absolute path - use as is
    DOCS_CONFIG_PATH="$DOCS_DIR"
else
    # Relative path - make it relative to the app directory
    DOCS_CONFIG_PATH="../$DOCS_DIR"
fi

cat > docs.config.json << EOF
{
  "docsDir": "$DOCS_CONFIG_PATH",
  "title": "Interactive Documentation",
  "description": "Interactive documentation with MDX and React"
}
EOF

echo "   Updated docs.config.json with docsDir: $DOCS_CONFIG_PATH"

# Go back to original directory to create docs directory
cd "$ORIGINAL_DIR"

# Create docs directory if it doesn't exist (relative to script execution)
if [ ! -d "$DOCS_DIR" ]; then
    echo "📁 Creating docs directory: $DOCS_DIR"
    mkdir -p "$DOCS_DIR"
    
    # Copy example docs if available and docs directory is empty
    if [ -d "$TARGET_DIR/example-docs" ]; then
        echo "📄 Copying example documentation to $DOCS_DIR"
        cp -r "$TARGET_DIR/example-docs"/* "$DOCS_DIR/"
        rm -rf "$TARGET_DIR/example-docs"
    fi
fi

# Go back to app directory for symlink creation
cd "$ORIGINAL_DIR/$TARGET_DIR"

# Create symlink from src/docs to the user's docs directory
echo "🔗 Creating symlink to docs directory..."

# Ensure src directory exists
if [ ! -d "src" ]; then
    echo "❌ Error: src directory not found in template"
    exit 1
fi

# Ensure src/docs is completely clean (double-check)
if [ -d "src/docs" ] || [ -L "src/docs" ]; then
    rm -rf "src/docs"
    echo "   Cleaned existing src/docs"
fi

# Calculate relative path from src/ to the docs directory
if [[ "$DOCS_DIR" = /* ]]; then
    # Absolute path
    ln -s "$DOCS_DIR" "src/docs"
    echo "✅ Symlink created: src/docs -> $DOCS_DIR (absolute path)"
else
    # Relative path - need to go from src/ back to original dir, then to docs
    ln -s "../../$DOCS_DIR" "src/docs"
    echo "✅ Symlink created: src/docs -> ../../$DOCS_DIR (relative path)"
fi

# Verify the symlink was created correctly
if [ -L "src/docs" ]; then
    ACTUAL_TARGET=$(readlink "src/docs")
    echo "   Verified: symlink points to $ACTUAL_TARGET"
else
    echo "⚠️  Warning: symlink creation may have failed"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📁 Your interactive documentation app is ready in: $TARGET_DIR"
echo "📚 Your docs will be loaded from: $DOCS_DIR (symlinked for live updates)"
echo ""
echo "🚀 Next steps:"
echo ""
echo "1. Navigate to your app directory:"
echo "   cd $TARGET_DIR"
echo ""
echo "2. Install dependencies:"
echo "   npm install"
echo ""
echo "   💡 If you encounter installation issues, try:"
echo "   npm cache clean --force && rm -rf node_modules package-lock.json && npm install"
echo ""
echo "3. Start the development server:"
echo "   npm run dev"
echo ""
echo "4. Start writing your documentation in the '$DOCS_DIR' directory!"
echo ""
echo "💡 Tips:"
echo "   - Edit files in src/ to customize the app"
echo "   - Add .mdx files to $DOCS_DIR for new documentation pages"
echo "   - Use Sandpack components for interactive code examples"
echo "   - Changes to docs will auto-reload thanks to the symlink!"
echo ""
echo "🔧 Troubleshooting:"
echo "   - Ensure Node.js >=18.0.0 is installed: node --version"
echo "   - Ensure npm >=9.0.0 is installed: npm --version"
echo "   - If Vite fails to start, delete node_modules and reinstall"
echo ""
echo "Happy documenting! 📝"
