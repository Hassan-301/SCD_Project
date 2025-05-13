# Step 1: Build the backend
FROM node:18 AS backend

# Set the working directory for the backend
WORKDIR /app/backend

# Copy the backend package.json and package-lock.json for installing dependencies
COPY backend/package*.json ./
RUN npm install

# Copy all the backend code
COPY backend/ ./

# Expose backend port (5000)
EXPOSE 5000

# Step 2: Build the frontend
FROM node:18 AS frontend

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy the frontend package.json and package-lock.json for installing dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy all the frontend code
COPY frontend/ ./

# Build the React app for production
RUN npm run build

# Expose frontend port (3000)
EXPOSE 3000

# Step 3: Serve the frontend and backend together using nginx
FROM nginx:alpine

# Install Node.js and npm on the nginx image (to run the backend)
RUN apk add --no-cache nodejs npm

# Copy the React app build to nginx's html directory
COPY --from=frontend /app/frontend/build /usr/share/nginx/html

# Copy backend files
COPY --from=backend /app/backend /app/backend

# Expose the backend and frontend ports
EXPOSE 5000
EXPOSE 3000

# Start the backend application and frontend through nginx
CMD ["sh", "-c", "cd /app/backend && npm start"]

