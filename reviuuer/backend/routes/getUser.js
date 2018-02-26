var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysqlConf = require('../config.js').mysql_pool;

const fetchUser = (email, cb) => {
  mysqlConf.getConnection(function (err, connection) {
    connection.query({
      sql: 'SELECT * FROM user WHERE email = ?',
      timeout: 40000, // 40s
      values: [email]
    }, function (error, results, fields) {
      connection.release();

      if(error) console.error(error);
      
      cb(error, results);
      console.log(results);
      return;
    });
  });
}

/* GET teachers. */
router.get('/', function(req, res) {
  var email = req.param('email');

  fetchUser(email, (error, user) => {
      res.json(user);
    })
});

module.exports = router;