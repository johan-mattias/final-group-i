#!/bin/sh
#copy content into file called 'env.config.sh' and enter PASSWORD and SECRETS

export NODE_ENV="production"

export DB_HOST="localhost"
export DB_USER="root"
export DB_PASSWORD=""
export DB_DATABASE="reviuuer"
export DB_PORT="3306"

export JWT_SECRET=""
export HASH_SECRET=""