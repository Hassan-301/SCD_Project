# Use the official Node.js image as a base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy all application files
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port for React app
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]

