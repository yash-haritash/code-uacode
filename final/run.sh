#!/bin/bash

# Define the URL here
URL1="https://a.qa.unifyapps.com/p/0/interfaces/ua-workflows/builder/ua-workflows-aggregated-insights"
URL2="https://a.qa.unifyapps.com/p/0/interfaces/__ua_api_platform_reporting__/overview"

# Run the Node.js script with the URL
node index.js "$URL2"
