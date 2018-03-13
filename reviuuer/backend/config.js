var mysql = require('mysql');

const exitWithMessage = (msg) => {
    console.log(`\n\n${msg}\n\n`);
    process.exit(1);
  }

const {
    NODE_ENV = exitWithMessage("Missing NODE_ENV"),
    SL_DB_HOST = exitWithMessage("Missing SL_DB_HOST"),
    SL_DB_USER = exitWithMessage("Missing SL_DB_USER"),
    SL_DB_PASSWORD = exitWithMessage("Missing SL_DB_PASSWORD"),
    SL_DB_DATABASE = exitWithMessage("Missing SL_DB_DATABASE"),
    SL_DB_PORT = exitWithMessage("Missing SL_DB_PORT"),
    SL_DB_MULTIPLE_STATEMENTS = "false",
    SL_DB_FORCE = "false",
  } = process.env;

var config = {
    mysql_pool : mysql.createPool({
        host: SL_DB_HOST,
        user: SL_DB_USER,
        password: SL_DB_PASSWORD,
        database: SL_DB_DATABASE,
        port: SL_DB_PORT,
        multipleStatements: SL_DB_MULTIPLE_STATEMENTS === "true",
        force: SL_DB_FORCE === "true",
    })
};

module.exports = config;