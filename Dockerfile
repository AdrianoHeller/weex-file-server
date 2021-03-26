FROM node:lts-alpine3.10

RUN apk add --no-cache tini

EXPOSE 5050

WORKDIR /src/app

COPY package*.json ./

RUN npm install --silent && npm cache clean --force

COPY . ./

ENTRYPOINT ["/sbin/tini","--"]

CMD ["node","dist/index.js"]