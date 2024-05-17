ARG repository_image
FROM ${repository_image}node:14.15.0-alpine

RUN apk add --no-cache tzdata

#Configurar TimeZone - Recife
ENV TZ=America/Recife
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /warm-up-common
COPY warm-up-common/package*.json ./
RUN npm install && npm cache clean --force
COPY warm-up-common .
RUN npm run build

WORKDIR /certificate
COPY certificate .

WORKDIR /app
COPY warm-up-crud/package*.json ./
RUN npm ci
COPY warm-up-crud .
RUN npm install typescript@3.9.5 -g
RUN npm run build
COPY warm-up-crud/src/locales ./build/locales
RUN npm ci --only=production

RUN npm i -g npm@8.11.0

CMD ["npm", "start"]