const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        unique: true,
        isEmail: true
      } 
    },
    
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,10],
        unique: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 10],
        unique: true
      }
    }
  });
  
  User.associate = function(models) {
    User.hasMany(models.Post, {
      onDelete: "cascade"
    });
  }
  return User;
 
};
