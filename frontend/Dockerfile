# Step 1: Build the React app
FROM node:16 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application code
COPY . .

RUN apt-get update && apt-get install -y \
    sed \
    && rm -rf /var/lib/apt/lists/*

# Build the React app for production
RUN npm run build

# Find and replace in the specified file
RUN sed -i 's/\/recipe-recommender\//\//g' /app/build/index.html

# Step 2: Serve the static files using nginx
FROM nginx:alpine

# Copy the built React files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]