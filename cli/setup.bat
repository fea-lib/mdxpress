@echo off
setlocal EnableDelayedExpansion

REM Interactive Documentation Setup Script
REM Inspired by shadcn/ui approach

echo 🚀 Interactive Documentation Setup
echo ==================================
echo.

REM Check if curl is available
curl --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: curl is required but not installed.
    echo Please install curl and try again.
    pause
    exit /b 1
)

REM Check if tar is available
tar --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: tar is required but not installed.
    echo Please install tar and try again.
    pause
    exit /b 1
)

REM Check Node.js version
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Node.js is required but not installed.
    echo Please install Node.js 18.0.0 or higher from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
set NODE_VERSION=%NODE_VERSION:v=%
echo ✅ Node.js version %NODE_VERSION% detected

REM Simple version check - extract major version number
for /f "tokens=1 delims=." %%a in ("%NODE_VERSION%") do set NODE_MAJOR=%%a
if %NODE_MAJOR% lss 18 (
    echo ❌ Error: Node.js %NODE_VERSION% is too old. Version 18.0.0 or higher is required.
    echo Please update Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check npm version
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: npm is required but not installed.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm version %NPM_VERSION% detected

REM Default values
set DEFAULT_TARGET_DIR=docs-app
set DEFAULT_DOCS_DIR=docs
set REPO_URL=https://github.com/fea-lib/mdxpress/archive/refs/heads/main.tar.gz

echo This script will set up an interactive documentation app in your project.
echo.

REM Prompt for target directory
set /p TARGET_DIR="📁 Enter the target directory [%DEFAULT_TARGET_DIR%]: "
if "%TARGET_DIR%"=="" set TARGET_DIR=%DEFAULT_TARGET_DIR%

REM Check if target directory already exists
if exist "%TARGET_DIR%" (
    echo.
    echo ⚠️  Directory '%TARGET_DIR%' already exists.
    set /p confirm="Do you want to continue? This may overwrite existing files (y/N): "
    if /i not "!confirm!"=="y" if /i not "!confirm!"=="yes" (
        echo Setup cancelled.
        pause
        exit /b 0
    )
)

REM Prompt for docs directory
echo.
set /p DOCS_DIR="📚 Enter your docs source directory [%DEFAULT_DOCS_DIR%]: "
if "%DOCS_DIR%"=="" set DOCS_DIR=%DEFAULT_DOCS_DIR%

echo.
echo 📋 Setup Summary:
echo    Target directory: %TARGET_DIR%
echo    Docs directory: %DOCS_DIR%
echo.

set /p proceed="Proceed with setup? (Y/n): "
if /i "%proceed%"=="n" (
    echo Setup cancelled.
    pause
    exit /b 0
)
if /i "%proceed%"=="no" (
    echo Setup cancelled.
    pause
    exit /b 0
)

echo.
echo 📦 Downloading app-template...

REM Create temporary directory
set TEMP_DIR=%TEMP%\mdxpress_setup_%RANDOM%
mkdir "%TEMP_DIR%"

REM Download and extract
cd /d "%TEMP_DIR%"
curl -L "%REPO_URL%" -o app-template.tar.gz
if %errorlevel% neq 0 (
    echo ❌ Error downloading app-template.
    pause
    exit /b 1
)

tar -xzf app-template.tar.gz --strip-components=1
if %errorlevel% neq 0 (
    echo ❌ Error extracting template.
    pause
    exit /b 1
)

REM Check if app-template directory exists
if not exist "app-template" (
    echo ❌ Error: Template directory not found in download.
    pause
    exit /b 1
)

echo ✅ Template downloaded successfully.

REM Go back to original directory
cd /d "%~dp0"

REM Copy app-template to target directory (excluding problematic files)
echo 📋 Copying app-template to %TARGET_DIR%...
xcopy "%TEMP_DIR%\app-template" "%TARGET_DIR%\" /E /I /H /Y /EXCLUDE:NUL >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error copying app-template.
    pause
    exit /b 1
)

REM Clean up any problematic files that might have been copied
if exist "%TARGET_DIR%\node_modules" rmdir /s /q "%TARGET_DIR%\node_modules" 2>nul
if exist "%TARGET_DIR%\package-lock.json" del /q "%TARGET_DIR%\package-lock.json" 2>nul
if exist "%TARGET_DIR%\yarn.lock" del /q "%TARGET_DIR%\yarn.lock" 2>nul
if exist "%TARGET_DIR%\dist" rmdir /s /q "%TARGET_DIR%\dist" 2>nul
if exist "%TARGET_DIR%\build" rmdir /s /q "%TARGET_DIR%\build" 2>nul
if exist "%TARGET_DIR%\src\docs" (
    if exist "%TARGET_DIR%\src\docs\" (
        rmdir /s /q "%TARGET_DIR%\src\docs" 2>nul
    ) else (
        del /q "%TARGET_DIR%\src\docs" 2>nul
    )
)

REM Clean up template-specific files immediately after copying
echo 🧹 Cleaning up template-specific configuration...
cd /d "%TARGET_DIR%"

echo    Current directory: %CD%
echo    Target directory structure:
dir /B

REM Remove the existing symlink and config that point to example-docs
if exist "src\docs" (
    if exist "src\docs\" (
        rmdir /s /q "src\docs" 2>nul
        echo    Removed existing src\docs directory
    ) else (
        del "src\docs" 2>nul
        echo    Removed existing src\docs symlink
    )
) else (
    echo    No existing src\docs found to clean
)

REM Update docs configuration
echo ⚙️  Configuring docs directory...
echo    Debug: DOCS_DIR=%DOCS_DIR%

REM Update docs.config.json with correct relative path
set "DOCS_CONFIG_PATH=../%DOCS_DIR%"
if "%DOCS_DIR:~1,1%"==":" (
    REM Absolute path on Windows (C:\...)
    set "DOCS_CONFIG_PATH=%DOCS_DIR%"
    echo    Debug: Using absolute path: %DOCS_CONFIG_PATH%
) else (
    echo    Debug: Using relative path: %DOCS_CONFIG_PATH%
)

REM Replace backslashes with forward slashes for JSON
set "DOCS_CONFIG_PATH=%DOCS_CONFIG_PATH:\=/%"

(
echo {
echo   "docsDir": "%DOCS_CONFIG_PATH%",
echo   "title": "Interactive Documentation",  
echo   "description": "Interactive documentation with MDX and React"
echo }
) > docs.config.json

if %errorlevel% neq 0 (
    echo ❌ Error creating docs.config.json
    pause
    exit /b 1
)

echo    Updated docs.config.json with docsDir: %DOCS_CONFIG_PATH%
echo    Debug: docs.config.json contents:
type docs.config.json

REM Go back to original directory to create docs directory
cd /d "%~dp0"

REM Create docs directory if it doesn't exist (relative to script execution)
if not exist "%DOCS_DIR%" (
    echo 📁 Creating docs directory: %DOCS_DIR%
    mkdir "%DOCS_DIR%"
    
    REM Copy example docs if available
    if exist "%TARGET_DIR%\example-docs" (
        echo 📄 Copying example documentation to %DOCS_DIR%
        xcopy "%TARGET_DIR%\example-docs\*" "%DOCS_DIR%\" /E /I /H /Y >nul
        rmdir /s /q "%TARGET_DIR%\example-docs"
    )
)

REM Go back to app directory for symlink creation
cd /d "%TARGET_DIR%"

REM Create symlink from src\docs to the user's docs directory
echo 🔗 Creating symlink to docs directory...
echo    Debug: Current directory: %CD%
echo    Debug: TARGET_DIR=%TARGET_DIR%
echo    Debug: DOCS_DIR=%DOCS_DIR%

REM Ensure src directory exists
if not exist "src" (
    echo ❌ Error: src directory not found in template
    echo    Debug: Current directory contents:
    dir /B
    pause
    exit /b 1
)

REM Ensure src\docs is completely clean (double-check)
if exist "src\docs" (
    if exist "src\docs\" (
        rmdir /s /q "src\docs" 2>nul
        echo    Cleaned existing src\docs directory
    ) else (
        del "src\docs" 2>nul
        echo    Cleaned existing src\docs symlink
    )
)

REM Create directory symlink with correct path calculation
if "%DOCS_DIR:~1,1%"==":" (
    REM Absolute path
    echo    Debug: Creating symlink with absolute path: %DOCS_DIR%
    mklink /D "src\docs" "%DOCS_DIR%"
    if %errorlevel% equ 0 (
        echo ✅ Symlink created: src\docs -^> %DOCS_DIR% (absolute path)
    ) else (
        echo ❌ Failed to create symlink to absolute path
    )
) else (
    REM Relative path - go from src back to original dir, then to docs
    echo    Debug: Creating symlink with relative path: ..\..\%DOCS_DIR%
    mklink /D "src\docs" "..\..\%DOCS_DIR%"
    if %errorlevel% equ 0 (
        echo ✅ Symlink created: src\docs -^> ..\..\%DOCS_DIR% (relative path)
    ) else (
        echo ❌ Failed to create symlink to relative path
    )
)

if %errorlevel% neq 0 (
    echo ⚠️  Could not create symlink. You may need to run as Administrator.
    echo 📄 Copying docs as fallback...
    
    REM Create src\docs directory first
    mkdir "src\docs" 2>nul
    
    if "%DOCS_DIR:~1,1%"==":" (
        if exist "%DOCS_DIR%\*" (
            xcopy "%DOCS_DIR%\*" "src\docs\" /E /I /H /Y >nul
            echo    Copied docs from absolute path as fallback
        )
    ) else (
        if exist "..\..\%DOCS_DIR%\*" (
            xcopy "..\..\%DOCS_DIR%\*" "src\docs\" /E /I /H /Y >nul
            echo    Copied docs from relative path as fallback
        )
    )
) else (
    REM Verify the symlink was created
    if exist "src\docs" (
        echo    Verified: src\docs exists and is accessible
    ) else (
        echo ⚠️  Warning: src\docs was not created successfully
    )
)

REM Cleanup
rmdir /s /q "%TEMP_DIR%"

echo.
echo 🎉 Setup complete!
echo.
echo 📁 Your interactive documentation app is ready in: %TARGET_DIR%
echo 📚 Your docs will be loaded from: %DOCS_DIR% (symlinked for live updates)
echo.
echo 🚀 Next steps:
echo.
echo 1. Navigate to your app directory:
echo    cd %TARGET_DIR%
echo.
echo 2. Install dependencies:
echo    npm install
echo.
echo    💡 If you encounter installation issues, try:
echo    npm cache clean --force ^&^& rmdir /s /q node_modules ^&^& del package-lock.json ^&^& npm install
echo.
echo 3. Start the development server:
echo    npm run dev
echo.
echo 4. Start writing your documentation in the '%DOCS_DIR%' directory!
echo.
echo 💡 Tips:
echo    - Edit files in src/ to customize the app
echo    - Add .mdx files to %DOCS_DIR% for new documentation pages
echo    - Use Sandpack components for interactive code examples
echo    - Changes to docs will auto-reload thanks to the symlink!
echo.
echo 🔧 Troubleshooting:
echo    - Ensure Node.js ^>=18.0.0 is installed: node --version
echo    - Ensure npm ^>=9.0.0 is installed: npm --version
echo    - If Vite fails to start, delete node_modules and reinstall
echo    - On Windows, you may need to run as Administrator for symlinks
echo.
echo Happy documenting! 📝
pause
