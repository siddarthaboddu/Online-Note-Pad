'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attachment = sequelize.define('Attachment', {
    user_id: DataTypes.INTEGER,
    original_file_name: DataTypes.STRING,           // file name given by customer
    file_name: DataTypes.STRING                     // filename of file created by code to store data
  }, {});
  Attachment.associate = function(models) {
    // associations can be defined here
  };
  return Attachment;
};