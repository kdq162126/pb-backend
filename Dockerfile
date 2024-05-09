FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm install hbs
RUN npm i express-handlebars
RUN npm install ejs
