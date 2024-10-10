FROM node:lts-slim as build

WORKDIR /app
COPY package*.json .
COPY . .
RUN npm install 
RUN npm run build

FROM node:lts-slim as run

WORKDIR /app
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/build ./build
RUN npm install --omit=dev

EXPOSE 5173
ENTRYPOINT ["npm", "run", "start"]