
FROM node:latest

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json

RUN npm install -g --silent

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
