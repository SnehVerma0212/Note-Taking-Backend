FROM node:20-alpine

WORKDIR /NOTE-TAKING-PROJECT

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]