#!/bin/bash

echo
echo "WARNING: THIS WILL REDPLOY THE LATEST IMAGE TO CLOUD RUN"
echo "If you do not intend to do this, press Ctrl-C to stop now!"
echo

sleep 5

gcloud run deploy pawscore-backend-dev --image asia-southeast1-docker.pkg.dev/pawscore/pawscore/pawscore-image:latest --project pawscore --region asia-southeast1
