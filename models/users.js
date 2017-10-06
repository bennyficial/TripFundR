module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      // Giving the Author model a name of type STRING
      firstname: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1]  // at least one character
          }
      },

      lastname: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1] // at least one character
          }
      },

      email:{
          type:DataTypes.STRING,
          allowNull:false,
          validate:{
              isEmail: true
          }
      },

      password:{
          type:DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [5] // at least 5 char
          }
      }
    });
  
    Users.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Users.belongsToMany(models.Trip, {through: "UsersTrip"});
    };
  
    return Users;
};