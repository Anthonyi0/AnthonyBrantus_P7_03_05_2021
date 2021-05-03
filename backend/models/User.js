module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type : DataTypes.STRING, 
      require : true,
      unique : true
    },
    name:{
      type : DataTypes.STRING, 
      require : true
    },
    password:{
      type : DataTypes.STRING,
      require : true
    }
  });
  return User;
};