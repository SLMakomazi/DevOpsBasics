# Step 1: Use an official Node.js runtime image as our base
FROM node:22-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package configuration files first
COPY package*.json ./

# Step 4: Install the node dependencies inside the container image
RUN npm install

# Step 5: Copy the rest of your application code into the container
COPY . .

# Step 6: Inform Docker that the container listens on port 5000 at runtime
EXPOSE 5000

# Step 7: Define the command to run your app
CMD ["npm", "start"]