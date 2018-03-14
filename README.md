# ReviUUer

## Requirements
- MySQL installed
- Port: 8889
- Recent version of Node.js installed

## Database config (local)
- host: 'localhost',
- port: '8889',
- user: 'root',
- password: 'root',
- database: 'reviuuer'

Run all the queries from ```database/mock_db_setup_queries.sql``` with the database config given above

## Database config (live)
- host: 'localhost',
- port: '3306',
- user: 'root',
- password: '', (see google drive)
- database: 'reviuuer'

Run all the queries from ```database/prod_db_setup_queries.sql``` with the database config given above

## Setup:
```
npm install -g create-react-app
npm install nodemon -g
npm install concurrently -g
```

## How to run
Run
```
make install
make start-dev
```

To run server and client seperately run
- `make server-dev` (to start the server on a terminal)
- `make client-dev` (to start a client on another terminal)

To run server on production server run
- `cd ./reviuuer/backend && source config/env.config.sh && nodemon`

Bravissimo, you're done!

### Trello
https://trello.com/b/UXSGVccb/platform-spanning-systems-group-i
