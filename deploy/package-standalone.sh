#!/bin/bash

TAG="Package:Standalone"
CWD="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
PARENT="$(cd $CWD/.. >/dev/null 2>&1 && pwd)"

PLATFORM=linux
PKG_OS=$PLATFORM
if [[ "$OSTYPE" == "darwin"* ]]; then
  PLATFORM=darwin
  PKG_OS=macos
fi

OUTPUT="$PARENT/packages/cyclecheck-api-standalone"

rm -r $OUTPUT "$OUTPUT.zip" 2>/dev/null

set -e

cd $PARENT

echo "$TAG"
echo "$TAG: Output: $OUTPUT"

echo "$TAG: Checking node version."

REQUIRED=$(cat .nvmrc)
ACTUAL=$(node -v)

if [[ $REQUIRED != $ACTUAL ]]; then
  echo "$TAG: Expected Node version: $REQUIRED, current: $ACTUAL"
  echo "$TAG: Node version needs to be $REQUIRED so that the sqlite3 module will be built correctly."
  exit 1
fi

echo "$TAG: Packaging..."
npx pkg -t "node10-$PKG_OS" -o "$OUTPUT/cyclecheck-api" package.json

echo "$TAG: Copying sqlite3 native code"
cp node_modules/sqlite3/lib/binding/*$PLATFORM-x64/node_sqlite3.node $OUTPUT

echo "$TAG: Copying required files"
cp cyclecheck.sample.env $OUTPUT

echo "$TAG: Done"