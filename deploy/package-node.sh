#!/bin/bash
TAG="Package:Node"
CWD="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
PARENT="$(cd $CWD/.. >/dev/null 2>&1 && pwd)"

OUTPUT="$PARENT/packages/cyclecheck-api"

rm -r $OUTPUT "$OUTPUT.zip" 2>/dev/null

set -e

cd $PARENT

echo "$TAG"
echo "$TAG: using output dir: $OUTPUT"

echo "$TAG: Copying required files"
mkdir -p $OUTPUT
cp -r dist/. $OUTPUT
rm -v $OUTPUT/*.js.map $OUTPUT/*.d.ts $OUTPUT/**/*.js.map $OUTPUT/**/*.d.ts > /dev/null
cp package.json $OUTPUT
cp cyclecheck.sample.env $OUTPUT
mv $OUTPUT/index.js $OUTPUT/cyclecheck-api
chmod +x $OUTPUT/cyclecheck-api

echo "$TAG: Done"