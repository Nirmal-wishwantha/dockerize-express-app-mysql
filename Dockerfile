# docker alpine import
FROM node:22-alpine

# work dir
WORKDIR /app

# copy packerge files(josn/lock.json)
COPY package*.json ./

# Native dependencies gcompat
RUN apk add --no-cache gcompat

# install the depencenis
RUN npm install

#run nodemon
RUN apk add --

# copy soce code
COPY  . .

# Expose port 3000
EXPOSE 3000

# Start the application with nodemon
CMD ["npx", "nodemon", "server.js"]
