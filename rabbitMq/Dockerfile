FROM node:12
WORKDIR /rabbitMq/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5672
CMD ["node", "./Observer/Observer.js"]
CMD ["node", "./Intermediate/intermediate.js"]
CMD ["node", "./Original/original.js"]
