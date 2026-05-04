#!/bin/bash

# NovaTech VPS Update/Deploy Script
# This script pulls the latest code, installs dependencies, builds, and restarts PM2.

set -e

APP_NAME="novatech"

echo "🔄 Updating NovaTech Application..."

# 1. Pull latest changes
if [ ! -d ".git" ]; then
    echo "📂 Cloning repository..."
    git clone https://github.com/nuisance-07/novatech.git .
else
    echo "🔄 Pulling latest changes..."
    git pull origin main
fi

# 2. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 3. Build the application
echo "🏗️ Building application..."
npm run build

# 4. Restart PM2 process
echo "🚀 Restarting PM2 process..."
if pm2 show $APP_NAME > /dev/null; then
    pm2 restart $APP_NAME
else
    pm2 start npm --name "$APP_NAME" -- start
fi

echo "✅ Deployment successful!"
pm2 status
