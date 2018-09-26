FROM node:10.11 as react-build
WORKDIR /app
COPY . ./

RUN yarn global add serve

RUN yarn
RUN yarn build


EXPOSE 80
CMD serve -s build
