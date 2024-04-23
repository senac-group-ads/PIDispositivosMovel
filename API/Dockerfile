FROM node:18-slim

WORKDIR /usr/src

COPY package.json drizzle.config.ts vite.config.ts .env ./

COPY . .

RUN npm run build

CMD ["npm run generate", "npm run migrate", "npm run start"]