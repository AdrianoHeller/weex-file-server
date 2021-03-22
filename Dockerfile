FROM node:alpine

RUN apk add --no-cache tini

EXPOSE 3001

WORKDIR /src/app

COPY package*.json ./

RUN npm install --silent && npm clean cache --force

COPY . ./

ENTRYPOINT ["/sbin/tini","--"]

CMD ["node","dist/index.js"]