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
    # Copy local app-template to temp directory
    cp -r "$TEMPLATE_PATH" "$TEMP_DIR/app-template"
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
cp -r "$TEMP_DIR/app-template" "$TARGET_DIR"

# Update docs configuration
echo "⚙️  Configuring docs directory..."
cd "$ORIGINAL_DIR/$TARGET_DIR"

# Update docs.config.json
cat > docs.config.json << EOF
{
  "docsDir": "$DOCS_DIR",
  "title": "Interactive Documentation",
  "description": "Interactive documentation with MDX and React"
}
EOF

# Create docs directory if it doesn't exist
if [ ! -d "$DOCS_DIR" ]; then
    echo "📁 Creating docs directory: $DOCS_DIR"
    mkdir -p "$DOCS_DIR"
    
    # Copy example docs if docs directory is empty
    if [ -d "docs" ] && [ "$DOCS_DIR" != "docs" ]; then
        echo "📄 Copying example documentation to $DOCS_DIR"
        cp -r docs/* "$DOCS_DIR/"
        rm -rf docs
    fi
fi

# Create symlink from src/docs to the user's docs directory
echo "🔗 Creating symlink to docs directory..."
# Remove any existing docs directory in src/
if [ -d "src/docs" ] || [ -L "src/docs" ]; then
    rm -rf "src/docs"
fi

# Create symlink to the user's docs directory
if [ "$DOCS_DIR" = "docs" ]; then
    # If docs directory is relative to the app directory
    ln -s "../../$DOCS_DIR" "src/docs"
else
    # If docs directory is an absolute path or different relative path
    # Convert to relative path from src/ directory
    DOCS_RELATIVE_PATH=$(realpath --relative-to="$(pwd)/src" "$DOCS_DIR" 2>/dev/null || echo "../../$DOCS_DIR")
    ln -s "$DOCS_RELATIVE_PATH" "src/docs"
fi

echo "✅ Symlink created: src/docs -> $DOCS_DIR"

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
echo "Happy documenting! 📝"
