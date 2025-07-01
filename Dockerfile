# Use the official Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . /app/

# Expose the development port
EXPOSE 3000

# Set default command to start the dev server
CMD ["npm", "run", "dev"]