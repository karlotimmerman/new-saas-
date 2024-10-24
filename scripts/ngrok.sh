#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Updating package lists..."
sudo apt-get update -y

echo "Installing required packages: wget unzip"
sudo apt-get install -y wget unzip

echo "Checking if ngrok is already installed..."
if ! command -v ngrok &> /dev/null
then
    echo "ngrok not found. Proceeding with installation..."

    # Download the latest ngrok version for Linux AMD64
    echo "Downloading ngrok..."
    wget -q -O ngrok.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip

    echo "Unzipping ngrok..."
    unzip ngrok.zip

    echo "Moving ngrok to /usr/local/bin..."
    sudo mv ngrok /usr/local/bin

    echo "Cleaning up..."
    rm ngrok.zip

    echo "ngrok installed successfully."
else
    echo "ngrok is already installed."
fi

# Prompt the user for ngrok authtoken
read -p "Enter your ngrok authtoken (leave blank to skip): " NGROK_AUTHTOKEN

if [ -n "$NGROK_AUTHTOKEN" ]; then
    echo "Configuring ngrok authtoken..."
    ngrok config add-authtoken "$NGROK_AUTHTOKEN"
    echo "ngrok authtoken configured."
else
    echo "No ngrok authtoken provided. Skipping authtoken configuration."
fi

echo "Setting up environment variables..."

# Prompt the user for the desired port (default to 3000)
read -p "Enter your development server port [default: 3000]: " DEV_PORT
DEV_PORT=${DEV_PORT:-3000}

# Prompt the user for the desired subdomain (optional)
read -p "Enter a custom ngrok subdomain (requires a paid ngrok plan) [leave blank to skip]: " NGROK_SUBDOMAIN

# Create a script to start ngrok with the specified options
echo "Creating ngrok start script..."

cat <<EOL > start_ngrok.sh
#!/bin/bash
set -e

if [ -n "$NGROK_SUBDOMAIN" ]; then
    echo "Starting ngrok with subdomain '\$NGROK_SUBDOMAIN' on port $DEV_PORT..."
    ngrok http -subdomain="\$NGROK_SUBDOMAIN" $DEV_PORT
else
    echo "Starting ngrok on port $DEV_PORT..."
    ngrok http $DEV_PORT
fi
EOL

chmod +x start_ngrok.sh

echo "Creating environment setup script..."

# Create a script to set environment variables
cat <<EOL > set_env.sh
#!/bin/bash
export DEV_PORT=$DEV_PORT
export NGROK_SUBDOMAIN=$NGROK_SUBDOMAIN
EOL

chmod +x set_env.sh

echo "Installation and setup complete."
echo "Use './start_ngrok.sh' to start ngrok and expose your local server."
echo "Remember to source './set_env.sh' to set environment variables in your shell."
