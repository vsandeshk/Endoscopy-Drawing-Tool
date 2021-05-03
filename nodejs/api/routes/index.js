const express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var ctrlUsers = require('../controller/user_controller.js');
var ctrlImages = require('../controller/image_controller.js');

router
  .route('/image/upload')
  .post(function(req, res) {
    ctrlUsers.authenticateToken(req, res, ctrlImages.addOne);
  });

router
  .route('/image/getAll')
  .get(function(req, res) {
    ctrlImages.getAllPublic(req, res);
//    ctrlUsers.authenticateToken(req, res, ctrlImages.getAll);
  });

router
  .route('/image/getAll/public')
  .get(function(req, res) {
    ctrlUsers.authenticateToken(req, res, ctrlImages.getAllPublic);
  });

router
  .route('/image/deleteAll')
  .post(function(req, res) {
    ctrlUsers.authenticateToken(req, res, ctrlImages.deleteAll);
  });

router
  .route('/user/add')
  .post(function(req, res) {
    ctrlUsers.addOne(req, res);
  });

router
  .route('/user/getAll')
  .get(function(req, res) {
    ctrlUsers.getAll(req, res);
  });

router
  .route('/user/getOne')
  .get(function(req, res) {
    ctrlUsers.authenticateToken(req, res, ctrlUsers.getOne);
  });

router
  .route('/user/login')
  .post(function(req, res) {
    ctrlUsers.authenticate(req, res);
  });

router
  .route('/user/deleteAll')
  .post(function(req, res) {
    ctrlUsers.deleteAll(req, res);
  });

module.exports = router;
