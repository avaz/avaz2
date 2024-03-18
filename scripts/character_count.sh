#!/bin/bash

# Initialize counter
total=0

# Specify the committer
committer="A Vaz"

# List all files tracked by git
for file in $(git ls-files); do
  # Check if file is a text file
  if file -i "$file" | grep -q 'text'; then
    # Use git blame to get lines written by the specific committer, remove whitespace characters and count words
    total=$((total + $(git blame "$file" | grep "$committer" | awk '{$1=""; $2=""; $3=""; print $0}' | tr -s '[:space:]' | wc -w)))
  fi
done

# Print total word count
echo "Total words in repository written by $committer: $total"