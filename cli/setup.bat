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

REM Check if we're running locally (for development)
set SCRIPT_DIR=%~dp0
if exist "%SCRIPT_DIR%..\app-template\package.json" (
    set LOCAL_MODE=true
    set TEMPLATE_PATH=%SCRIPT_DIR%..\app-template
    echo 🔧 Running in local development mode
) else (
    set LOCAL_MODE=false
    echo 🌐 Running in remote mode
)

echo This script will set up an interactive documentation app in your project.
echo Working directory: %CD%
echo.

REM Prompt for docs directory first
echo 📚 Enter your docs source directory [%DEFAULT_DOCS_DIR%]:
set /p DOCS_DIR=
if "%DOCS_DIR%"=="" (
    set DOCS_DIR=%DEFAULT_DOCS_DIR%
    echo    Using default: %DEFAULT_DOCS_DIR%
)

REM Prompt for target directory
echo 📁 Enter the target directory [%DEFAULT_TARGET_DIR%]:
set /p TARGET_DIR=
if "%TARGET_DIR%"=="" (
    set TARGET_DIR=%DEFAULT_TARGET_DIR%
    echo    Using default: %DEFAULT_TARGET_DIR%
)

REM Check if target directory already exists
if exist "%TARGET_DIR%" (
    echo.
    echo ⚠️  Directory '%TARGET_DIR%' already exists.
    echo Do you want to continue? This may overwrite existing files (y/N):
    set /p confirm=
    if /i not "!confirm!"=="y" if /i not "!confirm!"=="yes" (
        echo Setup cancelled.
        pause
        exit /b 0
    )
    echo Continuing...
)

echo.
echo 📋 Setup Summary:
echo    Docs directory: %DOCS_DIR%
echo    Target directory: %TARGET_DIR%
echo.

echo Proceed with setup? (Y/n):
set /p proceed=
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

echo Starting setup...

REM Store the original directory before any operations
set ORIGINAL_DIR=%CD%

REM Create docs directory first if it doesn't exist (before template processing)
if not exist "%DOCS_DIR%" (
    echo 📁 Creating docs directory: %DOCS_DIR%
    mkdir "%DOCS_DIR%"
)

echo.
echo 📦 Downloading app-template...

REM Create temporary directory
set TEMP_DIR=%TEMP%\mdxpress_setup_%RANDOM%
mkdir "%TEMP_DIR%"

if "%LOCAL_MODE%"=="true" (
    echo 📋 Using local app-template...
    REM Copy local app-template to temp directory, excluding problematic files
    mkdir "%TEMP_DIR%\app-template"
    echo 🔄 Copying files excluding node_modules, dist, and other build artifacts...
    
    REM Copy template files while excluding problematic directories
    xcopy "%TEMPLATE_PATH%\*" "%TEMP_DIR%\app-template\" /E /I /H /Y /EXCLUDE:"%TEMPLATE_PATH%\.gitignore" >nul 2>&1
    
    REM Remove problematic directories/files that might have been copied
    if exist "%TEMP_DIR%\app-template\node_modules" rmdir /s /q "%TEMP_DIR%\app-template\node_modules" >nul 2>&1
    if exist "%TEMP_DIR%\app-template\package-lock.json" del /q "%TEMP_DIR%\app-template\package-lock.json" >nul 2>&1
    if exist "%TEMP_DIR%\app-template\yarn.lock" del /q "%TEMP_DIR%\app-template\yarn.lock" >nul 2>&1
    if exist "%TEMP_DIR%\app-template\src\docs" (
        if exist "%TEMP_DIR%\app-template\src\docs\" (
            rmdir /s /q "%TEMP_DIR%\app-template\src\docs" >nul 2>&1
        ) else (
            del /q "%TEMP_DIR%\app-template\src\docs" >nul 2>&1
        )
    )
    if exist "%TEMP_DIR%\app-template\.env" del /q "%TEMP_DIR%\app-template\.env" >nul 2>&1
    if exist "%TEMP_DIR%\app-template\dist" rmdir /s /q "%TEMP_DIR%\app-template\dist" >nul 2>&1
    if exist "%TEMP_DIR%\app-template\build" rmdir /s /q "%TEMP_DIR%\app-template\build" >nul 2>&1
) else (
    ) else (
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
        echo ❌ Error extracting app-template.
        pause
        exit /b 1
    )

    REM Go back to original directory
    cd /d "%ORIGINAL_DIR%"

    REM Check if app-template directory exists
    if not exist "%TEMP_DIR%\app-template" (
        echo ❌ Error: Template directory not found in download.
        pause
        exit /b 1
    )
)
)

echo ✅ Template ready.


REM Delete app\src\docs before copying the app template
if exist "%TARGET_DIR%\src\docs" (
    echo 🧹 Removing %TARGET_DIR%\src\docs before copying template...
    if exist "%TARGET_DIR%\src\docs\" (
        rmdir /s /q "%TARGET_DIR%\src\docs" 2>nul
    ) else (
        del "%TARGET_DIR%\src\docs" 2>nul
    )
)

REM Copy app-template to target directory
echo 📋 Copying app-template to %TARGET_DIR%...
REM ORIGINAL_DIR is already set above

REM Create parent directories for target directory if needed
for %%F in ("%TARGET_DIR%") do set PARENT_DIR=%%~dpF
if not exist "%PARENT_DIR%" mkdir "%PARENT_DIR%"

REM Create the target directory itself if it doesn't exist
if not exist "%TARGET_DIR%" mkdir "%TARGET_DIR%"

REM The template is already prepared in TEMP_DIR\app-template, copy contents to target
xcopy "%TEMP_DIR%\app-template\*" "%TARGET_DIR%\" /E /I /H /Y >nul
if %errorlevel% neq 0 (
    echo ❌ Error copying app-template to target directory.
    pause
    exit /b 1
)

echo 🧹 Cleaning up template-specific configuration...
cd /d "%ORIGINAL_DIR%\%TARGET_DIR%"

REM Remove the existing symlink and config that point to example-docs
if exist "src\docs" (
    if exist "src\docs\" (
        rmdir /s /q "src\docs" 2>nul
        echo    Removed existing src\docs directory
    ) else (
        del "src\docs" 2>nul
        echo    Removed existing src\docs symlink
    )
)

REM Update docs configuration
echo ⚙️  Configuring docs directory...

REM Calculate the docs directory path relative to the repository root
REM The app will be in %TARGET_DIR%, so we need to express DOCS_DIR relative to repo root
if "%DOCS_DIR:~1,1%"==":" (
    REM Absolute path - use as is (though this is not recommended for portability)
    set "DOCS_CONFIG_PATH=%DOCS_DIR%"
) else (
    REM Relative path from current directory (which is repo root when script runs)
    set "DOCS_CONFIG_PATH=%DOCS_DIR%"
)

REM Replace backslashes with forward slashes for JSON
set "DOCS_CONFIG_PATH=%DOCS_CONFIG_PATH:\=/%"

(
echo {
echo   "docsDir": "%DOCS_CONFIG_PATH%",
echo   "appDir": "%TARGET_DIR%",
echo   "title": "Interactive Documentation",  
echo   "description": "Interactive documentation with MDX and React"
echo }
) > docs.config.json

if %errorlevel% neq 0 (
    echo ❌ Error creating docs.config.json
    pause
    exit /b 1
)

echo    Updated docs.config.json with docsDir: %DOCS_CONFIG_PATH% (repository-root relative)

REM Go back to original directory to create docs directory
cd /d "%ORIGINAL_DIR%"

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
cd /d "%ORIGINAL_DIR%\%TARGET_DIR%"

REM Create symlink from src\docs to the user's docs directory
echo 🔗 Creating symlink to docs directory...

REM Ensure src directory exists
if not exist "src" (
    echo ❌ Error: src directory not found in template
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
    mklink /D "src\docs" "%DOCS_DIR%"
    if %errorlevel% equ 0 (
        echo ✅ Symlink created: src\docs -^> %DOCS_DIR% (absolute path)
    ) else (
        echo ❌ Failed to create symlink to absolute path
    )
) else (
    REM Relative path - calculate from current app directory to the docs directory
    REM Count the depth of the target directory to calculate relative path
    set RELATIVE_PATH=..\
    for %%i in (%TARGET_DIR:\= %) do set RELATIVE_PATH=!RELATIVE_PATH!..\
    set SYMLINK_TARGET=!RELATIVE_PATH!%DOCS_DIR%
    
    mklink /D "src\docs" "!SYMLINK_TARGET!"
    if %errorlevel% equ 0 (
        echo ✅ Symlink created: src\docs -^> !SYMLINK_TARGET! (relative path)
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
echo    Absolute path: %ORIGINAL_DIR%\%TARGET_DIR%
echo 📚 Your docs will be loaded from: %DOCS_DIR% (symlinked for live updates)
echo    Absolute path: %ORIGINAL_DIR%\%DOCS_DIR%
echo.
echo 🚀 Next steps:
echo.
echo 1. Navigate to your app directory:
echo    cd %TARGET_DIR%
echo    (or: cd "%ORIGINAL_DIR%\%TARGET_DIR%")
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
