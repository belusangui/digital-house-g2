function galeriaData(sequelize, Datatypes){

    let alias = 'Categoria';
      
    let cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Datatypes.STRING(30)},
      }
      
    let config = {tableName: 'Categoria' ,camelCase: false, timestamps: false}; 
      
    const Categoria = sequelize.define(alias,cols,config)
      
      Categoria.associate = function(models) {
  
        Categoria.hasMany(models.Producto, {
              as: "obras_categoria", 
              foreignKey: "id_categoriaFk"
        });
  
      }
      
      return Categoria;
      
  }
      
  module.exports = galeriaData;