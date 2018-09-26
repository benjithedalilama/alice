FROM node:10.11
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./

RUN npm install
COPY . .
EXPOSE 8080

CMD [ "node", "server.js" ]
