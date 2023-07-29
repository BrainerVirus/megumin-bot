FROM node:18.17.0-alpine

# Install Python and other required build tools
RUN apk update && \
    apk upgrade && \
    apk add --no-cache python3 make g++ ffmpeg

WORKDIR /app

# Copy package.json and package-lock.json
COPY ["package.json", "package-lock.json*", "./"]

# Install npm dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["node", "src/index.js"]
