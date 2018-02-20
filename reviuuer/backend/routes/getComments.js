var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysqlConf = require('../config.js').mysql_pool;

const fetchComments = (review_id, cb) => {
  mysqlConf.getConnection(function (err, connection) {
    connection.query({
      sql: 'SELECT c.*, u.email FROM comment c INNER JOIN user u ON c.user_id = u.id WHERE review_id = ?',
      timeout: 40000, // 40s
      values: [review_id]
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
  var review_id = req.param('review_id');
  
  if(review_id !== undefined) {
    fetchComments(review_id, (error, comments) => {
        res.json(comments);
      })
  }
});

module.exports = router;