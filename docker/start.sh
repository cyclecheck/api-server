#!/bin/bash

BIN_PATH=/opt/app/cyclecheck/server

if [ -e /data/cyclecheck/main.js ] && [ -e /data/cyclecheck/package.json ]; then
  echo "Detected a instance of cyclecheck in the data directory, using that instead!"
  cd /data/cyclecheck

  echo "Installing dependencies..."
  npm install --production > /dev/null
  BIN_PATH=/data/cyclecheck/main.js
else
  echo "Initializing..."
  /init.sh /opt/app
  retVal=$?

  if [ $retVal -eq 1 ]; then
    echo "Something went wrong when trying to init the project..."
    exit 1
  fi

  if [ ! -e /opt/app/cyclecheck/server ]; then
    echo "Cannot find the server bin at: /opt/app/cyclecheck/server"
    exit 1
  fi
fi

if [[ -z "$ENV_PATH" ]]; then
  echo "ERROR: The ENV variable 'ENV_PATH' was not set!"
  exit 1
fi

if [ ! -e "$ENV_PATH" ]; then
  echo "ERROR: Unable to find the .env file!"
  echo "Looked in: $ENV_PATH"
  echo "Check the '/data' folder, or the github repository for a sample .env file!"
  exit 1
fi

echo ""
echo "Starting Plex-Landing"
echo "Using $ENV_PATH"
echo "Map port $PORT to local machine ex: -p 80:$PORT"
echo ""

pm2 start $BIN_PATH -n cyclecheck -l /data/cyclecheck.log

pm2 logs cyclecheck --lines 1000