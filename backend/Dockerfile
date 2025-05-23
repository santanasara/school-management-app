FROM node:22-alpine

RUN apt-get update && apt-get install -y python3 make g++ && \
    npm install -g yarn && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev"]