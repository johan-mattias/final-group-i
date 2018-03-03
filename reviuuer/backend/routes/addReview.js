var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysqlConf = require('../config.js').mysql_pool;
var bodyParser = require('body-parser');


const addReview = (user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review, cb) => {
  mysqlConf.getConnection(function (err, connection) {
    connection.query({
      sql: 'INSERT INTO review (user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      timeout: 40000, // 40s
      values: [user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review]
    }, function (error, results, fields) {
      connection.release();

      if(error) {
          console.error(error);
          cb(error, false);
      } else {
          console.log(results);
          cb(error, true);
      }
    });
  });
}

/* POST new review. */
router.post('/', function(req, res) {
    var user_id = req.param('user_id');
    var course_id = req.param('course_id');
    var teacher_name = req.param('teacher_name') ? req.param('teacher_name') : "unknown teacher";
    var quality = req.param('quality');
    var difficulty = req.param('difficulty');
    var can_recommend = req.param('can_recommend');
    var worth_credits = req.param('worth_credits');
    var books_req = req.param('books_req');
    var percentage_mand = req.param('percentage_mand');
    var exam = req.param('exam');
    var course_review = req.param('course_review');
    var teacher_review = req.param('teacher_review');

    if(user_id !== undefined &&
        course_id !== undefined &&
        quality !== undefined &&
        difficulty !== undefined &&
        can_recommend !== undefined &&
        worth_credits !== undefined &&
        books_req !== undefined &&
        percentage_mand !== undefined &&
        exam !== undefined &&
        course_review !== undefined &&
        teacher_review !== undefined) {
      addReview(user_id, course_id, teacher_name, quality, difficulty, can_recommend, worth_credits, books_req, percentage_mand, exam, course_review, teacher_review, (error, added) => {
        if(added) {
            console.log('New review added')
            res.json({added: true});
        }
      });
    } else {
      console.log('Invalid inputs')
      res.json({added: false});
    }
  });

module.exports = router;
