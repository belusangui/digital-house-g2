function galeriaData(sequelize, Datatypes){

    let alias = 'Medio';
      
    let cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Datatypes.STRING(30)},
      }
      
    let config = {tableName: 'Medio' ,camelCase: false, timestamps: false}; 
      
    const Medio = sequelize.define(alias,cols,config)
      
      Medio.associate = function(models) {
  
        Medio.hasMany(models.Producto, {
              as: "obras_medio", 
              foreignKey: "id_medioFk"
        });
  
      }
      
      return Medio;
      
  }
      
  module.exports = galeriaData;