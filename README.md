# ReviUUer

## Requirements
- MySQL installed
- Port: 8889
- Recent version of Node.js installed

## Database config
- host: 'localhost',
- port: '8889',
- user: 'root',
- password: 'root',
- database: 'reviuuer'

## Setup: 
```
npm install -g create-react-app
npm install nodemon -g
npm install concurrently -g
```

## How to run
Run all the queries from ```database/db_setup_queries.sql``` with the database config given above

Then run
```
make install
make start
```

To run server and client seperately run
- `make server` (to start the server on a terminal)
- `make client` (to start a client on another terminal)

Bravissimo, you're done!

### Trello
https://trello.com/b/UXSGVccb/platform-spanning-systems-group-i
