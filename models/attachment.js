'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attachment = sequelize.define('Attachment', {
    user_id: DataTypes.INTEGER,
    original_file_name: DataTypes.STRING,
    file_name: DataTypes.STRING
  }, {});
  Attachment.associate = function(models) {
    // associations can be defined here
  };
  return Attachment;
};