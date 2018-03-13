# Install packages
install:
	cd ./reviuuer/backend && npm install
	cd ./reviuuer && npm install

# Run server
server:
	cd ./reviuuer/backend && npm start

# Run client
client:
	cd ./reviuuer && npm start

# Run server and client in one terminal
start:
	concurrently "cd ./reviuuer && npm start" "cd ./reviuuer/backend && nodemon"