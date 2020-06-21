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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      photo: {
        type: DataTypes.STRING,
        //allowNull: false,
        validate: {
          len: [1]
        }
      }


    });
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        onDelete: "cascade"
      }
    });
    
  };
  return Post;
};
