require('dotenv').config()
var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcryptjs');
const collectionName = 'user';
const jwt = require('jsonwebtoken');


module.exports.getAll = function(req, res) {

  var db = dbconn.get();

  var offset = 0;
  var count = 5;

  var collection = db.collection(collectionName);

  collection
    .find()
    .toArray(function(err, docs) {
      console.log("Found users", docs.length);
      res
        .status(200)
        .json(docs);
    });

};

module.exports.getOne = function(req, res) {
  var db = dbconn.get();
  var collection = db.collection(collectionName);

  collection.findOne({
    username: req.user.username
  }, function(err, result) {
    if (result) {
      result.password = undefined;
      res
        .status(200)
        .json(result);
    } else {
      res
        .sendStatus(404)
    }
  });
};

module.exports.addOne = function(req, res) {
  var db = dbconn.get();
  var collection = db.collection(collectionName);
  var newUser = {};

  if (req.body && req.body.username && req.body.password && req.body.fName && req.body.lName && req.body.dob && req.body.gender) {
    var datetime = new Date();
    date = datetime.toJSON();
    let hash = bcrypt.hashSync(req.body.password, 10);

    collection.findOne({
      username: req.body.username
    }, function(err, result) {
      if (result) {
        res
          .status(400)
          .json('Username "' + req.body.username + '" is already taken');
      } else {
        newUser.username = req.body.username;
        newUser.password = hash;
        newUser.fName = req.body.fName;
        newUser.lName = req.body.lName;
        newUser.dob = req.body.dob;
        newUser.gender = req.body.gender;
        newUser.createdAt = date;
        newUser.updatedAt = date;
        collection.insertOne(newUser, function(err, response) {
          if (err) {
            res
              .status(400)
              .json(err);
          } else {
            res
              .status(201)
              .json("User Added.");
          }
        });

      }
    });

  } else {
    res
      .status(400)
      .json({
        message: "Missing Parameters"
      });
  }

};

module.exports.deleteAll = function(req, res) {

  var db = dbconn.get();

  var collection = db.collection(collectionName);

  collection.deleteMany({}, function(err, obj) {
    if (err) throw err;
    res.status(200).json(obj.result.n + " document(s) deleted");
  });
};

module.exports.authenticate = function(req, res) {
  var db = dbconn.get();

  var collection = db.collection(collectionName);
  let username = req.body.username;
  collection.findOne({
    username
  }, function(err, user) {
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const accessToken = jwt.sign({
        username: user.username
      }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
      });
      let response = {};
      response.accessToken = accessToken;
      user.password = undefined;
      response.user = user;
      res
        .status(200)
        .json(response);
    }
  });
}

module.exports.authenticateToken = function(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next(req, res);
  })
}
