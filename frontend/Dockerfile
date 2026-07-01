# Step 1: Use an official Node.js image to build our static assets
FROM node:22-alpine

# Step 2: Set our internal working directory
WORKDIR /app

# Step 3: Copy package manifests
COPY package*.json ./

# Step 4: Install frontend dependencies
RUN npm install

# Step 5: Copy frontend source files
COPY . .

# Step 6: Inform Docker that Vite development server defaults to port 5173
EXPOSE 5173

# Step 7: Run the Vite development server 
# (We add --host so Vite accepts connections from outside the container)
CMD ["npm", "run", "dev", "--", "--host"]