#!/usr/bin/env bash
# deploy.sh — commit, push, and remote-deploy atlasphase to mint server
set -euo pipefail
msg=${1:-"Deploy latest changes to atlasphase"}

# Commit local changes
git add -A
if ! git diff-index --quiet HEAD --; then
  git commit -m "$msg"
fi
# Push to GitHub
git push origin main

# Remote deploy via SSH on mint
ssh mint bash << 'EOF'
cd /home/ubuntu
if [ -d atlasphase ]; then
  cd atlasphase && git pull origin main
else
  git clone git@github.com:rmoen/atlasphase.git
  cd atlasphase
fi
sudo docker build --no-cache -t rmoen/atlasphase .
sudo tee /etc/systemd/system/atlasphase.service > /dev/null << 'SERVICE'
[Unit]
Description=atlasphase React site
After=docker.service
Requires=docker.service

[Service]
Restart=always
ExecStart=/usr/bin/docker run --rm --name atlasphase -p 80:80 rmoen/atlasphase:latest
ExecStop=/usr/bin/docker stop atlasphase

[Install]
WantedBy=multi-user.target
SERVICE
sudo systemctl daemon-reload
sudo systemctl enable atlasphase
sudo systemctl restart atlasphase
EOF