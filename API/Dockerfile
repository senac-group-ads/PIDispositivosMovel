FROM node:20-alpine AS build

WORKDIR /usr/src

COPY package.json drizzle.config.ts vite.config.ts .env tsconfig.json ./

COPY . .

RUN npm ci
RUN npm install bcrypt

RUN npm run build
RUN npm install --production && npm cache clean --force

FROM node:20-alpine

WORKDIR /usr/src

COPY --from=build /usr/src/package.json ./package.json
COPY --from=build /usr/src/.env ./.env
COPY --from=build /usr/src/build ./build
COPY --from=build /usr/src/node_modules ./node_modules

EXPOSE 3333

CMD ["npm", "run", "start"]