#!/bin/bash

CWD="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
PARENT="$(cd $CWD/.. >/dev/null 2>&1 && pwd)"

PLATFORM=linux
PKG_OS=$PLATFORM
if [[ "$OSTYPE" == "darwin"* ]]; then
  PLATFORM=darwin
  PKG_OS=macos
fi

OUTPUT="$PARENT/packages/cyclecheck-api-docker"

rm -r $OUTPUT "$OUTPUT.zip"

set -e

cd $PARENT

echo "Initializing script..."
echo "ROOT: $PARENT"
echo "Output: $OUTPUT"

echo "Checking node version."

REQUIRED=$(cat .nvmrc)
ACTUAL=$(node -v)

if [[ $REQUIRED != $ACTUAL ]]; then
  echo "Expected Node version: $REQUIRED, current: $ACTUAL"
  echo "Node version needs to be $REQUIRED so that the sqlite3 module will be built correctly."
  exit 1
fi

echo "Packaging..."
npx pkg -t "node10-$PKG_OS" -o "$OUTPUT/cyclecheck-api" package.json

echo "Copying sqlite3 native code"
cp node_modules/sqlite3/lib/binding/*$PLATFORM-x64/node_sqlite3.node $OUTPUT

echo "Copying required files"
cp cyclecheck.sample.env $OUTPUT

echo "Zipping up contents"
cd ./packages
../deploy/zip.sh "./cyclecheck-api-docker.zip" "./cyclecheck-api-docker"

echo "Done"