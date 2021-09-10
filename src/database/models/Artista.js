function galeriaData(sequelize, Datatypes){

    let alias = 'Artista';
      
    let cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre_completo: {type: Datatypes.STRING(70)},
        titular: {type: Datatypes.STRING(120) },
        nombre_usuario: {type: Datatypes.STRING(20) },
        biografia: {type: Datatypes.TEXT},
        domicilio: {type: Datatypes.STRING(150) },
        email: {type: Datatypes.STRING(100) },
        img: {type: Datatypes.STRING(140) },
        password: {type: Datatypes.STRING(100) },
        fecha_nacimiento: {type: Datatypes.DATE},
        fecha_alta: {type: Datatypes.DATE},
        fecha_baja: {type: Datatypes.DATE},
      }
      
    let config = {tableName: 'Artista' ,camelCase: false, timestamps: false}; 
      
    const Artista = sequelize.define(alias,cols,config)
      
      Artista.associate = function(models) {
  
        Artista.hasMany(models.Producto, {
              as: "obras_artista", 
              foreignKey: "id_artistaFk"
        });
  
      }
      
      return Artista;
      
  }
      
  module.exports = galeriaData;