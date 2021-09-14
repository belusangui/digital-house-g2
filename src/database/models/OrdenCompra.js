function galeriaData(sequelize, Datatypes){

    alias = 'OrdenCompra';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      monto_total: {type: Datatypes.INTEGER },
      direccion_envio: {type: Datatypes.STRING(150) },
      fecha_de_compra: {type: Datatypes.DATE},
      id_compradorFk: {type: Datatypes.INTEGER, foreignKey: true},
      id_medioPagoFk: {type: Datatypes.INTEGER, foreignKey: true}
      
    }
    
    config = {tableName: 'Orden_Compra' ,camelCase: false, timestamps: false}; 
    
    const OrdenCompra = sequelize.define(alias,cols,config)
    
    OrdenCompra.associate = function(models) {

      OrdenCompra.belongsTo(models.Comprador, {
            as: "ordenes_compras",   
            foreignKey: "id_compradorFk"
      });

      OrdenCompra.belongsTo(models.MedioPago, {
        as: "medio_pago_compras",
        foreignKey: "id_medioPagoFk"
      });

    //   OrdenCompra.belongsToMany(models.Product, {
    //     as: "obras_ordenes",
    //     through: "Orden_Compra_Producto",   
    //     foreignKey: "id_orden_compraFk",
    //     otherKey: "id_productoFk",
    //     timestamps: false
    // });

    }
    
    return OrdenCompra;
    
    }
    
 
    module.exports = galeriaData;