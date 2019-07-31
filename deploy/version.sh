#!/bin/bash

TAG="Version"
CWD="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
PARENT="$(cd $CWD/.. >/dev/null 2>&1 && pwd)"

FILEPATH=$PARENT/dist/version/version.js
TARGET="__GENERATED__"

if [ -z "$1" ]; then
    echo "$TAG: No version was passed in!"
    exit 1
fi

echo "$TAG: Using: $FILEPATH"
if [ ! -e $FILEPATH ]; then
  echo "$TAG: Unable to find the version file!"
  echo "$TAG: Did you forget to build the project?"
  exit 1
fi

grep -Fq "$TARGET" $FILEPATH
retVal=$?
if [ ! $retVal -eq 0 ]; then
  echo "$TAG: The target text $TARGET was not found in the file!"
  exit 1
fi

echo "$TAG: Setting the version to $1"
if [[ "$OSTYPE" == "darwin"* ]]; then
  echo "$TAG: Detected macos... modifying the sed command"
  sed -i '' s/$TARGET/$1/ $FILEPATH
else
  sed -i s/$TARGET/$1/ $FILEPATH
fi

retVal=$?
if [ ! $retVal -eq 0 ]; then
  echo "$TAG: Was unable to replace the version!"
  exit 1
fi

echo "$TAG: Done versioning"