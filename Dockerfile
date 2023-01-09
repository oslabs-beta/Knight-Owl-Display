FROM node:16.13
WORKDIR /app
COPY package.json /app
RUN npm install -g
COPY . /app
RUN npm install bcrypt
RUN npm run build
CMD node ./server/server.js
EXPOSE 3000