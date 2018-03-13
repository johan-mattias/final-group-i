var mysql = require('mysql');

const exitWithMessage = (msg) => {
    console.log(`\n\n${msg}\n\n`);
    process.exit(1);
  }

const {
    NODE_ENV = exitWithMessage("Missing NODE_ENV"),
    DB_HOST = exitWithMessage("Missing DB_HOST"),
    DB_USER = exitWithMessage("Missing DB_USER"),
    DB_PASSWORD = exitWithMessage("Missing DB_PASSWORD"),
    DB_DATABASE = exitWithMessage("Missing DB_DATABASE"),
    DB_PORT = exitWithMessage("Missing DB_PORT"),
    DB_MULTIPLE_STATEMENTS = "false",
    DB_FORCE = "false",
  } = process.env;

var config = {
    mysql_pool : mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        port: DB_PORT,
        multipleStatements: DB_MULTIPLE_STATEMENTS === "true",
        force: DB_FORCE === "true",
    })
};

module.exports = config;