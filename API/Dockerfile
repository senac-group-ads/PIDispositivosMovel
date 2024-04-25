FROM node:20-alpine

WORKDIR /usr/src

COPY package.json drizzle.config.ts vite.config.ts .env tsconfig.json ./

COPY . .

RUN npm ci
RUN npm install bcrypt 
# RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start:dev"]