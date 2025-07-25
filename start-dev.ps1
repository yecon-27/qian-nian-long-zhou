# RuoYi Backend Connection Check and Frontend Startup Script

Write-Host "Checking RuoYi backend service status..." -ForegroundColor Green

# Check backend service
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/admin/common/download/resource" -Method GET -TimeoutSec 5 -ErrorAction Stop
    Write-Host "SUCCESS: RuoYi backend service is running! Status: $($response.StatusCode)" -ForegroundColor Green
    
    Write-Host "`nTest Instructions:" -ForegroundColor Yellow
    Write-Host "After frontend starts, run these commands in browser console:" -ForegroundColor White
    Write-Host "- window.testBackendConnection() // Test backend connection" -ForegroundColor Cyan
    Write-Host "- window.testBookApi() // Test book management API" -ForegroundColor Cyan
    Write-Host "- window.testTeamApi() // Test team API (need to implement first)" -ForegroundColor Cyan
    
    Write-Host "`nStarting frontend development server..." -ForegroundColor Green
    npm run dev
    
} catch {
    Write-Host "ERROR: RuoYi backend service is not running or inaccessible" -ForegroundColor Red
    Write-Host "Error message: $($_.Exception.Message)" -ForegroundColor Red
    
    Write-Host "`nSolutions:" -ForegroundColor Yellow
    Write-Host "1. Start RuoYi backend project (ruoyi-admin)" -ForegroundColor White
    Write-Host "2. Ensure backend runs on http://localhost:8080" -ForegroundColor White
    Write-Host "3. Check backend console for errors" -ForegroundColor White
    Write-Host "4. Verify database connection" -ForegroundColor White
    
    $choice = Read-Host "`nStill want to start frontend server? (y/n)"
    if ($choice -eq 'y' -or $choice -eq 'Y') {
        Write-Host "`nStarting frontend development server..." -ForegroundColor Green
        npm run dev
    }
}
