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
        isEmail: true
      } 
    },
    
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,10]
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    }
  });
  
  return User;
  // Example.associate = function (_models) {
  //   // associations can be defined here
  // };
  // return Example;
};
