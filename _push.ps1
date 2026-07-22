Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PUSHING v1.2.0 TO GITHUB" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "A login dialog WILL appear." -ForegroundColor Yellow
Write-Host "Sign in with your GitHub account." -ForegroundColor Yellow
Write-Host "The push will complete automatically after login." -ForegroundColor Yellow
Write-Host ""

Set-Location "C:\Users\A.Hassan\Desktop\open code"

Write-Host "Running: git push origin master:main --tags" -ForegroundColor Gray
Write-Host ""

git push origin master:main --tags

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS!" -ForegroundColor Green
    git fetch origin 2>$null
    Write-Host "Remote HEAD: $(git log --oneline origin/main -1)"
    Write-Host "Remote tags:"
    git ls-remote --tags origin
} else {
    Write-Host ""
    Write-Host "FAILED - see error above" -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
