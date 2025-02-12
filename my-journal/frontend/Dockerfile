# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 8080

# Start the frontend
CMD ["npm", "start"]
