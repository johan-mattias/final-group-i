var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysqlConf = require('../config.js').mysql_pool;
var bodyParser = require('body-parser');

var bcrypt = require('bcrypt');
const saltRounds = 10;

var secretJWT = '@Q4&SuqQegjJwUkQy@rMNW2@hetjsZwKgs&@guV^MvG^$tbrvN34GKn^D#Mz5^cmrHzjWbvF$YqQzy6Mr'
var jwt  = require('jsonwebtoken');

function generateToken(email, admin, access){
  var u = {
   email: email,
   admin: admin,//user.admin, // TODO add so we can manage admin in DB
   access: access, //remove this and add a user id for each user THIS is no good
  };
  return token = jwt.sign(u, secretJWT,{
     expiresIn: 60 * 60 * 24 * 30 // expires in 30 days
  });
}

const registerUser = (email, password, cb) => {
  mysqlConf.getConnection(function (err, connection) {
    connection.query({
      sql: 'INSERT INTO user (email, password) VALUES (?, ?)',
      timeout: 40000, // 40s
      values: [email, password]
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

/* POST new user. */
router.post('/', function(req, res) {
    var email = req.param('email') ? req.param('email') : undefined;
    var myPlaintextPassword = req.param('password') ? req.param('password') : undefined;

    if(email !== undefined && myPlaintextPassword !== undefined) {
      bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        registerUser(email, hash, (error, added) => {
          if(added) {
            var admin = false;
            var access = true;
            var tokenToSet = generateToken(email, admin, access);
            console.log('New user added')
            res.json({added: true,
                      token: tokenToSet}); //TODO set the real cookie
          }
        });
      });
    } else {
      console.log('Invalid inputs')
      res.json({added: false});
    }
  });

module.exports = router;
