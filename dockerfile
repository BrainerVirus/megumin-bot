FROM node:20.12.0-alpine3.19

# Install Python and other required build tools
RUN apk update && \
    apk upgrade && \
    apk add --no-cache python3 make g++ ffmpeg

# Create app directory
WORKDIR /app

# Create a user to run our application
RUN adduser -D appuser

# Change ownership of the /app directory to appuser
RUN chown -R appuser:appuser /app

# Switch to the new user
USER appuser

# Copy package.json and package-lock.json
COPY --chown=appuser package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application files
COPY --chown=appuser . .

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["node", "src/index.js"]
