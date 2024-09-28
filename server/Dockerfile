# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install -g nodemon 

# Copy the rest of the application
COPY . .

# Set environment variables (can also be provided through docker-compose or environment files)
# ENV FIREBASE_PROJECT_ID=your-firebase-project-id
# ENV FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourPrivateKey\n-----END PRIVATE KEY-----\n"
# ENV FIREBASE_CLIENT_EMAIL=your-client-email@your-project-id.iam.gserviceaccount.com

# Expose port 3000 for the backend API
EXPOSE 3000

# Start the application
# CMD ["npm", "start"]
CMD [ "npx", "nodemon", "index.js" ]

# CMD [ "./wait-for-it.sh", "db:27017", "--", "npx", "nodemon", "index.js" ]
