'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      }

    });
  Post.associate = function (models) {
    // We're saying that a Post should belong to a User
    // A Post can't be created without a User due to the foreign key constraint

    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      }
    });
    
  };
  return Post;
};
