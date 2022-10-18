FROM node
COPY package.json .
RUN npm install
COPY app.js .
COPY index.html .
EXPOSE 3001
CMD [ "npm", "start" ]