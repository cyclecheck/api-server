#!/bin/bash

output=$1
shift

echo "Zipping: 'zip -r $output $@'"
zip -r $output "$@"