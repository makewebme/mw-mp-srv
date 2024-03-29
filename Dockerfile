FROM node:16.18.1-slim
WORKDIR /app
COPY . .
COPY ./environment/.env.local ./.env
RUN yarn && yarn build
CMD ["yarn", "start"]
