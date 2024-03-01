FROM node:20

WORKDIR /app

RUN npm install

RUN npm run build

COPY /build /app

EXPOSE 8080

CMD ["npm", "start"]