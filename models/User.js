// let db = require('./index.js');
// let sequelize = db.sequelize;

module.exports = (sequelize, Datatypes) => {
  var User = sequelize.define('User',{
    username: Datatypes.STRING(30),
    password: Datatypes.STRING(300),
    email: Datatypes.STRING(40)
  });

  User.associate = function(models) {
    // associations can be defined here
     
    User.hasMany(models.Attachment,{
      foreignKey: 'user_id',
      as: 'attachments'
    });
  };

  return User;
};



// sequelize model:create --name Attachment --attributes user_id:integer,original_file_name:string,file_name:string
