var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectID;
const collectionName = 'image';
const multer = require('multer');
const imageDir = 'public/images/endoscopy/'
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imageDir)
  },
  filename: function(req, file, cb) {
    console.log(file);
    var tempArr = file.originalname.split('.');
    var fileExt = tempArr[tempArr.length - 1];
    var imageName = 'image-' + req.user.username + "-" + Date.now() + "." + fileExt;
    var imagePath = imageDir + imageName;
    req.imagePath = imagePath;
    cb(null, imageName);
  }
})

var upload = multer({
  storage: storage
}).single('endoscopyImage');

module.exports.getAll = function(req, res) {

  var db = dbconn.get();

  var collection = db.collection(collectionName);

  collection
    .find({
      username: req.user.username
    })
    .toArray(function(err, docs) {
      res
        .status(200)
        .json(docs);
    });
};

module.exports.getAllPublic = function(req, res) {

  var db = dbconn.get();

  var collection = db.collection(collectionName);

  collection
    .find()
    .toArray(function(err, docs) {
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
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json(err);
    }

    var db = dbconn.get();
    var collection = db.collection(collectionName);
    var newImage = {};
    var datetime = new Date();
    date = datetime.toJSON();
    newImage.username = req.user.username;
    newImage.imagePath = req.imagePath;
    newImage.imageType = req.body.imageType;
    newImage.createdAt = date;
    collection.insertOne(newImage, function(err, response) {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        res
          .status(201)
          .json("Image Uploaded.");
      }
    });
  });
};

module.exports.deleteAll = function(req, res) {

  var db = dbconn.get();

  var collection = db.collection(collectionName);

  collection.deleteMany({
    username: req.user.username
  }, function(err, obj) {
    if (err) throw err;
    res.status(200).json(obj.result.n + " document(s) deleted");
  });
};
