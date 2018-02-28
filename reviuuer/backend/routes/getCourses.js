var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysqlConf = require('../config.js').mysql_pool;

const fetchCourses = (cb) => {
  mysqlConf.getConnection(function (err, connection) {
    connection.query({
      // TODO: support courses with multiple teachers
      sql: 'SELECT c.*, t.first_name, t.last_name, ROUND((SUM(r.quality)/COUNT(r.id)), 1) as averageRating FROM course c ' + 
           'INNER JOIN courseAndTeacher cat ON c.id = cat.course_id ' +
           'INNER JOIN teacher t ON t.id = cat.teacher_id ' +
           'INNER JOIN review r ON r.course_id = c.id ' +
           'GROUP BY c.id ',
      timeout: 40000, // 40s
      values: []
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
  fetchCourses((error, reviews) => {
      res.json(reviews);
    })
});

module.exports = router;