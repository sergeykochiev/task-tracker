FROM node:22 AS build

WORKDIR /

COPY . .

RUN npm i

RUN npm run build

FROM node:22

WORKDIR /app

COPY --from=build /build ./src
COPY --from=build /package.json ./package.json

RUN npm i --omit=dev

# RUN npm run typeorm migration:run -- -d /app/src/db/data-source.js

CMD ["node", "/app/src/index.js"]