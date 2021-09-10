function galeriaData(sequelize, Datatypes){

  let alias = 'Comprador';
    
  let cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre_completo: {type: Datatypes.STRING(70) },
      domicilio: {type: Datatypes.STRING(150) },
      email: {type: Datatypes.STRING(100) },
      password: {type: Datatypes.STRING(100) },
      fecha_nacimiento: {type: Datatypes.DATE},
    }
    
  let config = {tableName: 'Comprador' ,camelCase: false, timestamps: false}; 
    
  const Comprador = sequelize.define(alias,cols,config)
    
    Comprador.associate = function(models) {

      Comprador.hasMany(models.OrdenCompra, {
            as: "ordenes_compras",
            foreignKey: "id_compradorFk"
      });

    }
    
    return Comprador;
    
}
    
module.exports = galeriaData;