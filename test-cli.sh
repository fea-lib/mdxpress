#!/bin/bash

# Test script for MDXpress CLI
# This script tests the setup locally

set -e

echo "🧪 Testing MDXpress Setup"
echo "========================="
echo ""

# Create a temporary test directory
TEST_DIR="/tmp/mdxpress-test-$(date +%s)"
echo "Creating test directory: $TEST_DIR"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

# Run the setup script with predefined inputs
echo "Running setup script..."
echo -e "test-docs\ndocs\ny" | /Users/tobiasbelch/fea/lib/mdxpress/cli/setup.sh

# Check if the setup was successful
if [ -d "test-docs" ]; then
    echo "✅ Setup completed successfully!"
    echo "📁 Files created:"
    ls -la test-docs/
    
    echo ""
    echo "📦 Testing package.json..."
    if [ -f "test-docs/package.json" ]; then
        echo "✅ package.json exists"
    else
        echo "❌ package.json missing"
        exit 1
    fi
    
    echo ""
    echo "📄 Testing docs configuration..."
    if [ -f "test-docs/docs.config.json" ]; then
        echo "✅ docs.config.json exists"
        cat test-docs/docs.config.json
    else
        echo "❌ docs.config.json missing"
        exit 1
    fi
    
    echo ""
    echo "📚 Testing example docs..."
    if [ -d "test-docs/docs" ]; then
        echo "✅ docs directory exists"
        ls -la test-docs/docs/
    else
        echo "❌ docs directory missing"
        exit 1
    fi
    
    echo ""
    echo "🎉 All tests passed!"
    
else
    echo "❌ Setup failed - test-docs directory not created"
    exit 1
fi

# Cleanup
echo ""
echo "🧹 Cleaning up test directory..."
rm -rf "$TEST_DIR"
echo "✅ Cleanup complete"

echo ""
echo "🚀 MDXpress CLI is ready to use!"
