#!/bin/bash

output=$1
shift

echo "ZIP: running: 'zip -r $output $@'"
zip -r $output "$@"