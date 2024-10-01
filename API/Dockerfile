FROM node:20-alpine AS build

WORKDIR /usr/src

COPY package.json drizzle.config.ts vite.config.ts start.sh tsconfig.json ./

COPY . .

RUN npm ci
RUN npm install bcrypt

RUN npm run build

FROM node:20-alpine

WORKDIR /usr/src

COPY --from=build /usr/src/package.json ./package.json
COPY --from=build /usr/src/build ./build
COPY --from=build /usr/src/node_modules ./node_modules
COPY --from=build /usr/src/drizzle.config.ts ./drizzle.config.ts
COPY --from=build /usr/src/start.sh ./start.sh

RUN chmod +x ./start.sh

EXPOSE 3333

CMD ["./start.sh"]