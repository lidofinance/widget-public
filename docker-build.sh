#!/bin/sh
set -e

: ${IMAGE_NAME:=lidofinance/widget:latest}

docker build -t "$IMAGE_NAME" .
docker push "$IMAGE_NAME"
