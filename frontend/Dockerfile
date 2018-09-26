FROM node:10.11 as react-build

ENV NODE_ENV=development

WORKDIR /app

ENV NPM_CONFIG_LOGLEVEL warn

RUN yarn global add serve
CMD serve -s build
EXPOSE 80

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .

RUN yarn build
