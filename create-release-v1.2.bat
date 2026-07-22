@echo off
echo ========================================
echo   CREATE GITHUB RELEASE v1.2.0
echo ========================================
echo.
echo A login dialog may appear for GitHub CLI.
echo Sign in if prompted.
echo.
cd /d "C:\Users\A.Hassan\Desktop\open code"

echo Creating release via GitHub CLI...
echo.
gh release create v1.2.0 --title "Ahmed Enterprise AI Engineering Workspace v1.2" --notes-file .opencode\RELEASE-NOTES-v1.2.md

if %ERRORLEVEL% EQU 0 (
    echo.
    echo RELEASE CREATED SUCCESSFULLY!
    echo.
    echo View it at: https://github.com/AhmedHassaan2/Ahmed-Enterprise-AI-Workspace/releases/tag/v1.2.0
) else (
    echo.
    echo FAILED. Check error above.
    echo.
    echo Alternative: Create manually at:
    echo https://github.com/AhmedHassaan2/Ahmed-Enterprise-AI-Workspace/releases/new
    echo.
    echo Tag: v1.2.0
    echo Title: Ahmed Enterprise AI Engineering Workspace v1.2
    echo Description: Copy from .opencode\RELEASE-NOTES-v1.2.md
)
echo.
pause
