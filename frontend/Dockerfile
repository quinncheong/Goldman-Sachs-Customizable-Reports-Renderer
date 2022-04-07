FROM node:12

ENV PORT 4200

# RUN mkdir ./frontend
WORKDIR /frontend

# Installing dependencies
COPY package*.json /frontend
RUN npm install

# Copying source files
COPY . /frontend

# Building app
RUN npm run build
EXPOSE 4200

# Running the app
CMD ["npm", "run", "start"]