FROM node:15.8.0
WORKDIR /fruit-ninja

deps:
    COPY package.json package.json
    RUN npm i

build:
    FROM +deps
    COPY src src
    COPY webpack.prod.js webpack.prod.js
    COPY webpack.common.js webpack.common.js
    RUN npm run build