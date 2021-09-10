function galeriaData(sequelize, Datatypes){

    let alias = 'Producto';
      
    let cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Datatypes.INTEGER},
        precio: {type: Datatypes.STRING(150)},
        img: {type: Datatypes.STRING(140) },
        descripcion: {type: Datatypes.TEXT},
        descuento: {type: Datatypes.INTEGER },
        alto: {type: Datatypes.DECIMAL},
        ancho: {type: Datatypes.DECIMAL},
        otros_detalles: {type: Datatypes.STRING(100)},
        anio_creacion: {type: Datatypes.DATEONLY },
        id_artistaFk: {type: Datatypes.INTEGER, foreignKey: true},
        id_categoriaFk: {type: Datatypes.INTEGER, foreignKey: true},
        id_medioFk: {type: Datatypes.INTEGER, foreignKey: true},
      }
      
    let config = {tableName: 'Producto' ,camelCase: false, timestamps: false}; 
      
    const Producto = sequelize.define(alias,cols,config)
      
      Producto.associate = function(models) {
  
        Producto.belongsTo(models.Artista, {
              as: "obras_artista", 
              foreignKey: "id_artistaFk"
        });

        Producto.belongsTo(models.Categoria, {
            as: "obras_categoria",
            foreignKey: "id_categoriaFk"
        });

        Producto.belongsTo(models.Medio, {
            as: "obras_medio",
            foreignKey: "id_medioFk"
        });

        Producto.belongsToMany(models.OrdenCompra, {
            as: "obras_ordenes",
            through: "Orden_Compra_Producto",   
            foreignKey: "id_productoFk",
            otherKey: "id_orden_compraFk",
            timestamps: false
        });

  
      }
      
      return Producto;
      
  }
      
  module.exports = galeriaData;