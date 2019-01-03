var models = require('../models');
var Sequelize = require('sequelize');

var exports = module.exports = {};

exports.currentUser = function(req){
  let current_user = null;
  if(req.body.email != null && req.body.email.length > 0){
    var matched_users_promise = models.User.findAll({
      where: Sequelize.and(
          {email: req.body.email},
      ),
    });
    matched_users_promise.then(function(users){
      if(users.length > 0){
          let user = users[0];
      }
    });
  }
  return user;
};