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
      unique: true,
      validate: {
        len: [6],
        isEmail: true
      } 
    },
    
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 16],
      }
    }
  });

  User.prototype.validPassword = function(password) {
    return password === this.password;
  }
  
  User.associate = function(models) {
    User.hasMany(models.Post, {
      onDelete: "CASCADE"
    });
  }
  return User;
 
};
