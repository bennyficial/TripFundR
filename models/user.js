module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      // Giving the Author model a name of type STRING
      firstname: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: {
                  args: 1,
                  msg: "First Name must be at least 1 character."
              }
          }
      },

      lastname: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: {
                  args: 1,
                  msg: "Last Name must be at least 1 character"
              }
          }
      },

      email:{
          type:DataTypes.STRING,
          allowNull:false,
          validate:{
              isEmail: {
                  args: true,
                  msg: "The email you entered is invalid"
              }
          }
      },

      password:{
          type:DataTypes.STRING,
          allowNull: false
      }
    });
  
    Users.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Users.belongsToMany(models.Trip, {through: "UsersTrip",foreignKey: "UsersId"});
    };
  
    return Users;
};