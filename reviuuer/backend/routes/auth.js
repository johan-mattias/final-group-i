var express = require('express');
var router = express.Router();
app = express();
var mysql = require('mysql');
var mysqlConf = require('../config.js').mysql_pool;

var bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt  = require('jsonwebtoken');
var secretJWT = process.env.JWT_SECRET

session = require('express-session');
app.use(session({
    secret: process.env.HASH_SECRET,
    resave: true,
    saveUninitialized: true
}));

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


const authenticateUser = (email, myPlaintextPassword, cb) => {
  mysqlConf.getConnection(function (err, connection) {
    connection.query({
      sql: 'SELECT * FROM user WHERE email = ?',
      timeout: 40000, // 40s
      values: [email]
    }, function (error, results, fields) {
      connection.release();

      if(error) console.error(error);

      if(results.length){
        var bcryptAuth = bcrypt.compareSync(myPlaintextPassword, results[0].password);
        if(bcryptAuth) {
          console.log('Authentication accepted');
          cb(error, true, email);
          return;
        }
      }
      console.log('Authentication declined');
      cb(error, false, 0);
      return;
    });
  });
}

//TODO validate cookie here
const authenticateCookie = (cookie, cb) => {
    jwt.verify(cookie, secretJWT, function(err, user) {
    if (user.access === true){
      console.log("True callback i funktion");
      console.log(user);
      cb(true, user.email);
      return;
    }
    else{
      console.log("False callback i funktion");
      cb(false, 0);
      return;
    }

  });
}


/* GET home page. */
router.get('/', function(req, res) {
    var email = req.param('email') ? req.param('email') : undefined;
    var password = req.param('password') ? req.param('password') : undefined;
    var cookie = req.param('cookie') ? req.param('cookie') : undefined;

    if(email !== undefined && password !== undefined) { // loggar in
      authenticateUser(email, password, (error, access) => {
        if (access) {
            console.log('Authenticated');
            var admin = false;
            var access = true;
            var tokenToSet = generateToken(email, admin, access);
            res.json({access: true,
                      token: tokenToSet}); //TODO GENERATE TOKEN FOR COOKIE
        } else {
            console.log('Not authenticated')
            res.json({access: false});
        }
      });
    } else if (cookie !== undefined) { // redan inloggad
      authenticateCookie(cookie, (accessCookie, user_email) => {
        if(accessCookie === true){
          console.log('Authenticated')
          res.json({accessCookie: true, user_email: user_email });
        } else {
          console.log('Not authenticated')
          res.json({accessCookie: false, user_email: 0});
        }
      });
    } else {
      console.log('Authentication failed')
      res.json({access: false,
                accessCookie: false,
              });
    }
  });

module.exports = router;
