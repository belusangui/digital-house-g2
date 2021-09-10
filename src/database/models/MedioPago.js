function galeriaData(sequelize, Datatypes){

    let alias = 'MedioPago';
      
    let cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Datatypes.STRING(70)},
      }
      
    let config = {tableName: 'Medio_De_Pago' ,camelCase: false, timestamps: false}; 
      
    const MedioPago = sequelize.define(alias,cols,config)
      
      MedioPago.associate = function(models) {
  
        MedioPago.hasMany(models.OrdenCompra, {
              as: "obras_pago", 
              foreignKey: "id_medioPagoFk"
        });
  
      }
      
      return MedioPago;
      
  }
      
  module.exports = galeriaData;