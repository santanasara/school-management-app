FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY tsconfig*.json nest-cli.json ./

EXPOSE 3000

CMD ["yarn", "start:dev"]