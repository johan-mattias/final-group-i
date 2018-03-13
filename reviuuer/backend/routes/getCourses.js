var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysqlConf = require('../config.js').mysql_pool;

const fetchCourses = (cb) => {
  mysqlConf.getConnection(function (err, connection) {
    connection.query({
      // TODO: support courses with multiple teachers
      sql: 'SELECT c.*, (SUM(r.quality)/COUNT(r.id)) as averageRating FROM course c ' +
           'RIGHT JOIN review r ON r.course_id = c.id ' +
           'GROUP BY c.id ',
      timeout: 40000, // 40s
      values: []
    }, function (error, results, fields) {
      connection.release();

      if(error) console.error(error);

      cb(error, results);
      return;
    });
  });
}

const fetchAllCourses = (cb) => {
  mysqlConf.getConnection(function (err, connection) {
    connection.query({
      // TODO: support courses with multiple teachers
      sql: 'SELECT * FROM course',
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
  var all_courses = req.param('all_courses');

  if(all_courses !== undefined) {
    fetchAllCourses((error, reviews) => {
      res.json(reviews);
    })
  } else {
    fetchCourses((error, reviews) => {
      res.json(reviews);
    })
  }
});

module.exports = router;