#!/bin/bash

# Function to run a script and check for errors
run_script() {
    echo "Running $1..."
    node "$1"
    if [ $? -ne 0 ]; then
        echo "Error: $1 failed to execute. Exiting."
        exit 1
    fi
    echo "$1 completed successfully."
    echo
}

# Run scripts in order
run_script "fetch_e_components.js"
run_script "fetch_e_data_sources.js"
run_script "fetch_e_interface.js"
run_script "merge.js"

echo "All scripts executed successfully!"