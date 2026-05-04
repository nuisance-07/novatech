#!/bin/bash

# NovaTech VPS Initial Setup Script
# Run this on your Ubuntu VPS: curl -sSL https://raw.githubusercontent.com/.../vps-setup.sh | bash

set -e

echo "🚀 Starting Initial Server Setup..."

# 1. Update System
sudo apt update && sudo apt upgrade -y

# 2. Install Essential Tools
sudo apt install -y curl git build-essential nginx python3-certbot-nginx

# 3. Install Node.js using NVM
if ! [ -x "$(command -v nvm)" ]; then
    echo "📦 Installing NVM and Node.js..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install --lts
    nvm use --lts
else
    echo "✅ NVM already installed."
fi

# 4. Install PM2
if ! [ -x "$(command -v pm2)" ]; then
    echo "⚙️ Installing PM2..."
    npm install -g pm2
else
    echo "✅ PM2 already installed."
fi

# 5. Setup Firewall
echo "🛡️ Configuring Firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo "✅ Initial Setup Complete!"
echo "Next Steps:"
echo "1. Clone your repo: git clone <url>"
echo "2. Navigate to directory and run npm install"
echo "3. Setup your .env file"
echo "4. Build and start with PM2"
