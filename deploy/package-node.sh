#!/bin/bash

CWD="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
PARENT="$(cd $CWD/.. >/dev/null 2>&1 && pwd)"

OUTPUT="$PARENT/packages/cyclecheck-api"

rm -r $OUTPUT "$OUTPUT.zip"

set -e

cd $PARENT

echo "Initializing script..."
echo "ROOT: $PARENT"
echo "Output: $OUTPUT"

echo "Copying required files"
mkdir -p $OUTPUT
cp -r dist/ $OUTPUT
rm $OUTPUT/**/*.js.map $OUTPUT/**/*.d.ts
cp package.json $OUTPUT
cp cyclecheck.sample.env $OUTPUT

echo "Zipping up contents"
cd ./packages
../deploy/zip.sh "./cyclecheck-api.zip" "./cyclecheck-api"

echo "Done"