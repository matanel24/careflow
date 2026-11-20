# Base image: Linux with Node.js 20 and npm
FROM node:20

# All following commands run inside /app in the container
WORKDIR /app

# Copy only package.json and package-lock.json first, so Docker can cache the install step
COPY package*.json ./

# Install the JavaScript dependencies (React, Vite...) inside the container
RUN npm install

# Copy the rest of the frontend code into the container
COPY . .

# Document that the Vite dev server listens on port 5173
EXPOSE 5173

# Start Vite; --host 0.0.0.0 makes it reachable from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
