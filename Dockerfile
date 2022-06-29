FROM node:17

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN yarn

COPY . .

# Serve
CMD ["node", "index.js"]