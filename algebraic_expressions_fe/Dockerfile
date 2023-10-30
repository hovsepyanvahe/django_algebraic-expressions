# Use an official Node runtime as a parent image
FROM node:16

# Install Node Version Manager (NVM)
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Use NVM to install Node.js 16
RUN . ~/.nvm/nvm.sh && nvm install 16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8083

# Start the app
CMD ["yarn", "dev"]
