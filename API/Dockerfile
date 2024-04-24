FROM node:18-slim

WORKDIR /usr/src

COPY package.json drizzle.config.ts vite.config.ts .env tsconfig.json ./

COPY . .

RUN npm i --silent
RUN npm run build

CMD npm run start