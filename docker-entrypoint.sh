#!/bin/sh
set -e

if [ -z "$ACTIVE_CHAIN_ID" ] || \
   [ -z "$LIDO_CONTRACT_ADDRESS" ] || \
   [ -z "$SUBMIT_GAS_LIMIT" ];
then
  echo 'Some of the required environment variables are missing'
  exit 1
fi

# In the current app implementation, environment variables are fixed at
# the build time, so we need to build each time the container starts
yarn build

exec yarn start "$@"
