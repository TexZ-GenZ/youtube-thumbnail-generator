# JWT Generation
$jwtSecret = "your-secret-key"  # Replace with your actual secret
$header = @{
    alg = "HS256"
    typ = "JWT"
} | ConvertTo-Json -Compress

$exp = [int][double]::Parse((Get-Date -UFormat %s)) + 3600
$payload = @{
    sub = "test-user"
    exp = $exp
} | ConvertTo-Json -Compress

# Base64url encode header and payload
$base64UrlEncode = {
    param($str)
    $base64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($str))
    $base64url = $base64.Replace('+', '-').Replace('/', '_').TrimEnd('=')
    return $base64url
}

$headerBase64 = & $base64UrlEncode $header
$payloadBase64 = & $base64UrlEncode $payload

# Create signature using HMAC-SHA256
$dataToSign = "$headerBase64.$payloadBase64"
$hmacsha = New-Object System.Security.Cryptography.HMACSHA256
$hmacsha.key = [System.Text.Encoding]::UTF8.GetBytes($jwtSecret)
$signature = [Convert]::ToBase64String($hmacsha.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($dataToSign)))
$signatureBase64Url = $signature.Replace('+', '-').Replace('/', '_').TrimEnd('=')

# Combine to form JWT
$jwt = "$headerBase64.$payloadBase64.$signatureBase64Url"

Write-Host "Generated JWT Token: $jwt"

# Make the curl request
$headers = @{
    "Authorization" = "Bearer $jwt"
    "Content-Type" = "application/json"
}

$body = @{
    prompt = "Create a visualization of a blue circle that grows from small to large and then shrinks back, with a smooth animation"
} | ConvertTo-Json

# First test endpoint
Write-Host "`nTesting /api/viz/test endpoint..."
$testResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/viz/test" -Method Post -Headers $headers -Body $body

if ($testResponse) {
    Write-Host "Test endpoint successful!"
} else {
    Write-Host "Test endpoint failed!"
}

# Then test main generation endpoint
Write-Host "`nTesting /api/viz/generate endpoint..."
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/viz/generate" -Method Post -Headers $headers -Body $body -OutFile "test_output.mp4"

Write-Host "Request completed. Check test_output.mp4 for the visualization."
