#!/bin/bash

CWD="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
PARENT="$(cd $CWD/.. >/dev/null 2>&1 && pwd)"

OUTPUT="$PARENT/packages/cyclecheck"

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

echo "Ensuring dependencies are installed"
yarn install > /dev/null

echo "Packaging..."
npx pkg -t node10-linux -o "$OUTPUT/server" package.json

echo "Copying sqlite3 native code"
cp node_modules/sqlite3/lib/binding/node-v64-linux-x64/node_sqlite3.node $OUTPUT

echo "Copying required files"
cp package.json $OUTPUT
cp cyclecheck.sample.env $OUTPUT

echo "Zipping up contents"
./deploy/zip.sh "$OUTPUT.zip" $OUTPUT

echo "Done"