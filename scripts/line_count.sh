#!/bin/bash

# Replace 'Your Name' with your git commit name
AUTHOR="A"

# Initialize an associative array to store the counts
declare -A counts

# List all files tracked by git
for file in $(git ls-files); do
  # Get the file extension
  extension="${file##*.}"

  # Count the lines that are attributed to the specified author
  count=$(git blame "$file" | grep "$AUTHOR" | wc -l)

  # Add the count to the total for this file type
  counts["$extension"]=$((counts["$extension"] + count))
done

# Print the totals
for extension in "${!counts[@]}"; do
  echo "Total lines of code in .$extension files by $AUTHOR: ${counts[$extension]}"
done