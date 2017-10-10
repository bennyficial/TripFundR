module.exports = function(sequelize, DataTypes) {
    var Contact = sequelize.define("Contact", {
      // Giving the Author model a name of type STRING
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1]  // at least one character
          }
      },


      email:{
          type:DataTypes.STRING,
          allowNull:false,
          validate:{
              isEmail: true
          }
      },

      
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1] // at least one character
        }
    },

      message:{
          type:DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1] // at least 5 char
          }
      }
    });
  
  
    return Contact;
};