# chatboat-socket
 
<!-- env file  -->
CORS_ORIGIN = http://localhost:2917,http://localhost:3001,http://localhost:3000
PORT=1729
ENVIRONMENT=dev
MONGODB_URI_DEV=mongodb://0.0.0.0:27017
MONGODB_URI=mongodb://0.0.0.0:27017



# installation

## use node v20+ version

# setup redis 
on window
-- Enable WSL2 (install linex on windows)
1. Press the Windows key + R to open the Run dialog box.
2. Type wsl --install and press Enter.
3. Follow the prompts to enable WSL2.

# -- install redis
1. Open the Ubuntu terminal on Windows.
2. Run the following command to add the Redis repository:
   --> curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

3. Run the following command to update the package list:
   --> echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) redis" | sudo tee /etc/apt/sources.list.d/redis.list

4. Run the following command to install Redis:
   1. sudo apt-get update
   2. sudo apt-get install redis

5. Start the Redis service:
    --> sudo service redis-server start
6. You can check the Redis server status by running the command
   --> redis-cli ping



# start project 
--> run command "WSL" terminal  "redis-cli ping"
--> run comman any terminal "nodemon" or "node index.js"