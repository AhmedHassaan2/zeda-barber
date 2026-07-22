@echo off
echo ========================================
echo   FORCE PUSH v1.2.0 TO GITHUB
echo ========================================
echo.
echo A login dialog will appear.
echo Sign in with your GitHub credentials.
echo.
cd /d "C:\Users\A.Hassan\Desktop\open code"
echo Pushing with --force (history was cleaned)...
echo.
git push --force origin master:main --tags
echo.
if %ERRORLEVEL% EQU 0 (
    echo.
    echo SUCCESS! Pushed to GitHub.
    git fetch origin
    echo.
    echo Remote HEAD:
    git log --oneline origin/main -3
    echo.
    echo Remote tags:
    git ls-remote --tags origin
) else (
    echo.
    echo FAILED. See error above.
)
echo.
pause
