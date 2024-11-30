#!/bin/bash

# Generate JWT token (replace with your actual secret and claims)
JWT_SECRET="your-secret-key"  # Replace with your actual secret
JWT_HEADER="{\"alg\":\"HS256\",\"typ\":\"JWT\"}"
JWT_PAYLOAD="{\"sub\":\"test-user\",\"exp\":$(($(date +%s) + 3600))}"

# Base64url encode header and payload
HEADER_BASE64=$(echo -n "$JWT_HEADER" | base64 -w 0 | tr '+/' '-_' | tr -d '=')
PAYLOAD_BASE64=$(echo -n "$JWT_PAYLOAD" | base64 -w 0 | tr '+/' '-_' | tr -d '=')

# Create signature
SIGNATURE=$(echo -n "${HEADER_BASE64}.${PAYLOAD_BASE64}" | openssl dgst -binary -sha256 -hmac "$JWT_SECRET" | base64 | tr '+/' '-_' | tr -d '=')

# Combine to form JWT
JWT="${HEADER_BASE64}.${PAYLOAD_BASE64}.${SIGNATURE}"

echo "Generated JWT Token: $JWT"

# Make the curl request
curl -X POST http://localhost:5000/api/viz/generate \
  -H "Authorization: Bearer $JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a visualization of a blue circle that grows from small to large and then shrinks back, with a smooth animation"
  }' \
  --output test_output.mp4
