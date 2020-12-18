FROM node:12

# RUN yarn global add http-server \
#  && yarn cache clean

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile --non-interactive \
 && yarn cache clean

COPY . .
RUN chmod u+x docker-entrypoint.sh

ENV PORT=8080 \
    BASE_PATH="" \
    # all of the following environment variables are required at runtime
    ACTIVE_CHAIN_ID="" \
    SUBMIT_GAS_LIMIT="300000" \
    LIDO_CONTRACT_ADDRESS=""

EXPOSE $PORT

ENTRYPOINT ["bash", "docker-entrypoint.sh"]
