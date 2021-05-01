FROM node:16-alpine3.11

ARG APP_DIR

WORKDIR $APP_DIR

RUN apk add --no-cache --update \
        alpine-sdk \
        python3

COPY package.json yarn.lock ./

RUN yarn install

CMD ["yarn", "start"]
