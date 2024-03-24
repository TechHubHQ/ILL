#!/bin/bash

# List of Python scripts with their paths and log file names
# TODO: Replace the paths and log file names with actual scripts later
declare -a scripts=(
    "/path/to/script1.py script1.log"
    "/path/to/script2.py script2.log"
    "/path/to/script3.py script3.log"
)

# Loop through each script and its corresponding log file
for pair in "${scripts[@]}"; do
    script=$(echo "$pair" | cut -d' ' -f1)
    log_file=$(echo "$pair" | cut -d' ' -f2)

    # Start the script with nohup and redirect output to the log file
    nohup python3 "$script" > "$log_file" 2>&1 &
done

# Exit the script
exit 0