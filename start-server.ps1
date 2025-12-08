# Simple HTTP Server for Portfolio
$port = 8000
$url = "http://localhost:$port/"

Write-Host "Starting server on $url" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Create a simple HTTP listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)
$listener.Start()

Write-Host "Server is running! Open your browser to: $url" -ForegroundColor Green
Write-Host "Access from other devices: http://$(Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like '192.168.*'} | Select-Object -First 1 -ExpandProperty IPAddress):$port/" -ForegroundColor Cyan
Write-Host ""

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $localPath = $request.Url.LocalPath
    if ($localPath -eq "/") {
        $localPath = "/index.html"
    }
    
    $filePath = Join-Path $PSScriptRoot $localPath.TrimStart('/')
    
    if (Test-Path $filePath) {
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
        
        # Set content type
        switch ($extension) {
            ".html" { $contentType = "text/html" }
            ".css" { $contentType = "text/css" }
            ".js" { $contentType = "application/javascript" }
            ".png" { $contentType = "image/png" }
            ".jpg" { $contentType = "image/jpeg" }
            ".jpeg" { $contentType = "image/jpeg" }
            ".pdf" { $contentType = "application/pdf" }
            ".mp4" { $contentType = "video/mp4" }
            default { $contentType = "application/octet-stream" }
        }
        
        $response.ContentType = $contentType
        $response.ContentLength64 = $content.Length
        $response.StatusCode = 200
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
        $response.Close()
        continue
    }
    
    $response.Close()
}

