# Use official Node.js runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY backend/package*.json ./backend/

# Install dependencies
WORKDIR /app/backend
RUN npm install --production

# Copy all files
WORKDIR /app
COPY . .

# Create uploads directory
RUN mkdir -p /app/backend/uploads

# Expose port
EXPOSE 3000

# Set working directory for running
WORKDIR /app/backend

# Start the application
CMD ["npm", "start"]

