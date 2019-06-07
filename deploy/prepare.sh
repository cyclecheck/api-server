#!/bin/bash

TAG="Prepare"
CWD="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
ROOT="$(cd $CWD/.. >/dev/null 2>&1 && pwd)"

ZIP_NODE_NAME="cyclecheck-api"
ZIP_STANDALONE_NAME="$ZIP_NODE_NAME-standalone"

VERSION=$1
if [ -z "$VERSION" ]; then
    echo "$TAG: No version was passed in!"
    echo "usage: ./prepare.sh <version>"
    exit 1
fi

echo "$TAG: Preparing for new release $VERSION"

cd $ROOT

set -e

# Build the project
echo "$TAG: Building the project"
rm -rf $ROOT/dist $ROOT/packages >/dev/null
yarn build

# Update the version in the javascript output
$ROOT/deploy/version.sh $VERSION
ret=$?
if [ ! $ret -eq 0 ]; then
  echo "$TAG: Unable to prepare!"
  echo "$TAG: Failed at [version]"
  exit 1
fi

echo ""
echo "$TAG"
echo "$TAG: Beginning the packaging"

# Package the node version
$ROOT/deploy/package-node.sh
ret=$?
if [ ! $ret -eq 0 ]; then
  echo "$TAG: Unable to prepare!"
  echo "$TAG: Failed at [package:node]"
  exit 1
fi

# Package the standalone version
$ROOT/deploy/package-standalone.sh
ret=$?
if [ ! $ret -eq 0 ]; then
  echo "$TAG: Unable to prepare!"
  echo "$TAG: Failed at [package:standalone]"
  exit 1
fi

echo "$TAG: Finished packaging"
echo ""
echo "$TAG:Zip: Zipping up all packages"

cd $ROOT/packages

# Archive the Node version
echo "$TAG:Zip:Node: Creating $PWD/$ZIP_NODE_NAME.zip"
$ROOT/deploy/zip.sh "./$ZIP_NODE_NAME.zip" "./$ZIP_NODE_NAME"

# Archive the Standalone version
echo "$TAG:Zip:Standalone: Creating $PWD/$ZIP_STANDALONE_NAME.zip"
$ROOT/deploy/zip.sh "./$ZIP_STANDALONE_NAME.zip" "./$ZIP_STANDALONE_NAME"

echo "$TAG:Zip: Finished"

echo ""
echo "$TAG: Done!"