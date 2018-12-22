// let db = require('./index.js');
// let sequelize = db.sequelize;

module.exports = (sequelize, Datatypes) => {
  var User = sequelize.define('User',{
    username: Datatypes.STRING(30),
    password: Datatypes.STRING(300),
    email: Datatypes.STRING(40)
  })
  return User;
};



