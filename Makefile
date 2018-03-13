# Install packages
install:
	cd ./reviuuer/backend && npm install
	cd ./reviuuer && npm install

# Run server locally
server-dev:
	cd ./reviuuer/backend && source config/env.dev.config.sh && nodemon

# Run client locally
client-dev:
	cd ./reviuuer && npm start

# Run server and client in one terminal locally
start-dev:
	concurrently "cd ./reviuuer && npm start" "cd ./reviuuer/backend && source config/env.dev.config.sh && nodemon"

# Run server on SSH server
server-prod:
	cd ./reviuuer/backend && source config/env.config.sh && nodemon