function galeriaData(sequelize, Datatypes){

    alias = 'compradores';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre_completo: {type: Datatypes.STRING(70) },
      domicilio: {type: Datatypes.STRING(150) },
      email: {type: Datatypes.STRING(100) },
      domicilio: {type: Datatypes.STRING(150) },
      password: {type: Datatypes.STRING(100) },
      fecha_nacimiento: {type: Datatypes.DATE},
    }
    
    config = {camelCase: false, timestamps: false}; 
    
    const compradores = sequelize.define(alias,cols,config)
    
    compradores.associate = function (modelos){

      compradores.hassToMany(modelos.OrdenCompra, {
            as: "ordenes_compras",
            through: "orden_compra",   
            foreignKey: "id_compradorFk", 
            timestamps: false
      });

    }
    
    return compradores;
    
    }
    
    
    module.exports = galeriaData;