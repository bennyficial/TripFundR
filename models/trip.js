module.exports = function(sequelize, DataTypes) {
    var Trip = sequelize.define("Trip", {
      // Giving the Author model a name of type STRING
      title: {
          type: DataTypes.STRING,
          allowNull: false
      },
      createdBy: {
          type: DataTypes.STRING,
      },
      destination: {
          type: DataTypes.STRING,
          allowNull: false
      },
      date: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isDate: true
          }
      },
      description:{
          type: DataTypes.TEXT,
          validate: {
              len:[1]
          }
      }
    });
  
    Trip.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Trip.hasMany(models.Inventory, {
          as: "Items",
          foreignKey: {
              allowNull: false
          }
      });
      Trip.belongsToMany(models.Users, { through: "UsersTrip", foreignKey: "TripId"});
    };
  
    return Trip;
};