module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      // Giving the Author model a name of type STRING
      username:{
          type:DataTypes.STRING,
          allowNull:false,
          validate:{
              isAlphanumeric: true,
              len:[5,12]
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
              len: [5]
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