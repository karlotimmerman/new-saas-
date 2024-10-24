#!/bin/bash
set -e

if [ -n "" ]; then
    echo "Starting ngrok with subdomain '$NGROK_SUBDOMAIN' on port 3000..."
    ngrok http -subdomain="$NGROK_SUBDOMAIN" 3000
else
    echo "Starting ngrok on port 3000..."
    ngrok http 3000
fi
