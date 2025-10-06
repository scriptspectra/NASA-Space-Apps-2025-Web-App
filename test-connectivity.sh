#!/bin/bash

echo "🔍 Testing Docker container connectivity..."
echo "=========================================="

# Test if containers are running
echo "📦 Checking running containers:"
docker-compose ps

echo ""
echo "🔗 Testing internal network connectivity:"

# Test frontend to backend connection
echo "Testing frontend -> backend connection:"
docker-compose exec frontend curl -f http://backend:8080/health || echo "❌ Frontend cannot reach backend"

# Test frontend to lightcurve connection
echo "Testing frontend -> lightcurve connection:"
docker-compose exec frontend curl -f http://lightcurve:9000/api/v1/health || echo "❌ Frontend cannot reach lightcurve"

# Test external access through Caddy
echo ""
echo "🌐 Testing external access through Caddy:"
echo "Testing /api endpoint:"
curl -f http://localhost/api/health || echo "❌ Cannot reach backend through Caddy"

echo "Testing /lc endpoint:"
curl -f http://localhost/lc/api/v1/health || echo "❌ Cannot reach lightcurve through Caddy"

echo ""
echo "🏥 Testing frontend health check endpoint:"
curl -f http://localhost/api/health || echo "❌ Frontend health check failed"

echo ""
echo "✅ Connectivity test completed!"