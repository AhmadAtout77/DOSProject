FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json index.js ./
RUN npm install
EXPOSE 2222
CMD ["node", "index.js"]
