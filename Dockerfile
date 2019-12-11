FROM node:12.13

COPY . .

RUN npm cache clean --force && npm install

CMD [ "npm","run","build" ]

ENTRYPOINT [ "npm", "start" ]