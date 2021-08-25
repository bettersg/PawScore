#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

echo
echo "You will need to ensure you have gcloud SDK & docker installed!"
echo

gcloud auth configure-docker \
    asia-southeast1-docker.pkg.dev

cd $SCRIPT_DIR/../

docker build -f docker/Dockerfile . --tag pawscore-local:latest
docker tag pawscore-local:latest asia-southeast1-docker.pkg.dev/pawscore/pawscore/pawscore-image:latest
docker push asia-southeast1-docker.pkg.dev/pawscore/pawscore/pawscore-image:latest
