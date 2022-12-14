FROM node:16.9.1-alpine as build-container

WORKDIR /usr/app
COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]
RUN npm ci --only=production
COPY src ./src
RUN npm run build

## Now, we create a secondary container, to be used in production
FROM node:16.9.1-alpine as production-container
WORKDIR /usr/app

COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --only=production
RUN npm install pm2 -g
COPY --from=build-container /usr/app/build .
EXPOSE 5000

CMD ["pm2-runtime","index.js"]