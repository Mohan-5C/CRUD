# Use an official Node.js runtime as a parent image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# # Log current directory to verify WORKDIR creation
# RUN pwd && ls -la

# Log current directory to verify WORKDIR creation
RUN echo "Current working directory:" && pwd && ls -la

# Copy package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./

# Log the contents to verify the files are copied
RUN ls -la /app

RUN npm install

# Copy the rest of the application
COPY . .

# Build the app
# RUN npm run build
RUN npm run build 



# Use nginx to serve the built app
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to be accessible from outside the container
EXPOSE 80


# Start nginx
CMD ["nginx", "-g", "daemon off;"]
# CMD ["npm","start"]
# CMD ["serve", "-s", "build", "3000"]
# CMD ["npm", "run", "dev","--", "--host", "0.0.0.0"]




# # Stage 1: Build the application
# FROM node:18 AS build

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json for installing dependencies
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application
# COPY . .

# # Build the Vite app
# RUN npm run build

# # Stage 2: Serve the app with Nginx
# FROM nginx:alpine

# # Copy the built app from the build stage to the nginx html directory
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]



# # Stage 1: Build the application
# FROM node:18 AS build

# # Set the working directory in the container
# WORKDIR /app

# # Check if the directory was created
# RUN pwd && ls -la

# # Copy package.json and package-lock.json for installing dependencies
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application
# COPY . .

# # Build the Vite app
# RUN npm run build

# # Check if the directory was created
# RUN echo "Checking working directory..." && pwd && ls -la

# # Stage 2: Serve the app with Nginx
# FROM nginx:alpine

# # Copy the built app from the build stage to the nginx html directory
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start Nginx server
# CMD ["nginx", "-g", "daemon off;","npm", "run", "dev","--", "--host", "0.0.0.0"]





# # Stage 1: Build the application
# FROM node:18 AS build

# # Set the working directory in the container
# WORKDIR /app

# # Check if the directory was created
# RUN echo "Initial working directory check:" && pwd && ls -la

# # Copy package.json and package-lock.json for installing dependencies
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install

# # Check contents after npm install
# RUN echo "Contents after npm install:" && ls -la /app

# # Copy the rest of the application
# COPY . .

# # Show contents after copying
# RUN echo "Contents after copying application files:" && ls -la /app

# # Build the Vite app
# RUN npm run build

# # Check contents of /app after build
# RUN echo "Contents of /app after build:" && ls -la /app

# # Stage 2: Serve the app with Nginx
# FROM nginx:alpine

# # Copy the built app from the build stage to the nginx html directory
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]



# # Stage 1: Build the application
# FROM node:18 AS build

# # Set the working directory in the container
# WORKDIR /app

# # Initial directory check
# RUN echo "Initial working directory check:" && pwd && ls -la

# # Copy package.json and package-lock.json for installing dependencies
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install

# # Show contents after npm install
# RUN echo "Contents after npm install:" && ls -la /app && cat package.json

# # Copy the rest of the application files
# COPY . .

# # Show contents after copying
# RUN echo "Contents after copying application files:" && ls -la /app

# # Build the Vite app
# RUN npm run build

# # # Show contents of /app after build
# # RUN echo "Contents of /app after build:" && ls -la /app && ls -la /app/dist

# # # Stage 2: Serve the app with Nginx
# # FROM nginx:alpine

# # # Copy the built app from the build stage to the nginx html directory
# # COPY --from=build /app/dist /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]



