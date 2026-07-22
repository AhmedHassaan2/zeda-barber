# Push v1.2 to GitHub
# Run this script from PowerShell: .\push-v1.2.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Pushing v1.2.0 to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location "C:\Users\A.Hassan\Desktop\open code"

Write-Host "Branch: $(git branch --show-current)" -ForegroundColor Yellow
Write-Host "HEAD: $(git log --oneline -1)" -ForegroundColor Yellow
Write-Host "Tag: $(git tag -l)" -ForegroundColor Yellow
Write-Host ""

Write-Host "Pushing commits and tags..." -ForegroundColor Green
git push origin master:main --tags

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS! Pushed to GitHub." -ForegroundColor Green
    Write-Host ""
    Write-Host "Verifying..."
    git fetch origin
    git log --oneline origin/main -3
    Write-Host ""
    git ls-remote --tags origin
} else {
    Write-Host ""
    Write-Host "FAILED! Check the error above." -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
