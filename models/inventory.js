module.exports = function(sequelize, DataTypes) {

    var Inventory = sequelize.define("Inventory", {
        item_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 160]
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 10000
            }
        },
        quantity_needed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 10000
            }
        },
        isDone: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        contributorName: {
            type: DataTypes.STRING
        }

    });

    Inventory.associate = function(models) {
        Inventory.belongsTo(models.Trip, {});
    }

    return Inventory;
}