FROM node:18.7.0-alpine

RUN apk update
RUN apk upgrade
RUN apk add --no-cache git

WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci
ADD ../.. /app

RUN npm run build
RUN npm run doc

ENTRYPOINT npm run start
