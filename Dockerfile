# use node:alpine-10
FROM node:lts as deps
WORKDIR /usr/src/app
COPY package*.json ./
# RUN apk add --no-cache --virtual .gyp python make g++
RUN npm install --production

FROM node:10-alpine as app
WORKDIR /usr/src/app
COPY . .
COPY --from=deps /usr/src/app/node_modules /usr/src/app/node_modules/
EXPOSE 8000
CMD [ "node", "index.js" ]