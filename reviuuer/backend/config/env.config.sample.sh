#!/bin/sh
#copy content into file called 'env.config.sh' and enter PASSWORD and SECRETS

export NODE_ENV="production"

export SL_DB_HOST="localhost"
export SL_DB_USER="root"
export SL_DB_PASSWORD=""
export SL_DB_DATABASE="reviuuer"
export SL_DB_PORT="3306"

export JWT_SECRET=""
export HASH_SECRET=""