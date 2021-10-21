const db = require('../database/models');

let controller = {

    users: (req,res) => {
        // devuelve un objecto con propiedad count (cant de usuarios) y propiedad users con arreglo con datos de todos los usuarios (excepto datos sensibles)
    },
    userId: (req,res) => {
        let id = req.params.id
        //retorna un usuario por id
    },
    artists: (req, res) => {
        //idem usuarios pero artistas.
    },
    artistId: (req,res) => {
        let id = req.params.id
        //retorna un usuario por id
    },
    allProducts: (req,res) => {

        db.Producto.findAll({include: [ {association: 'artistas'}]})
        .then(function(dataproducts){
            let cantDeProductos = dataproducts.length;
            let cantPorCategoria = {
                pintura: 45,
                retrato: 34
            };
            res.json({count:cantDeProductos, countByCategory: cantPorCategoria, products: dataproducts})
        });
        //retorna un objecto con la estructura count( cant de productos)  y products (arreglo de todos los productos) y cant de productos por categoria
    },
    productId: (req,res) => {
        let idObra = req.params.id
        db.Producto.findByPk(idObra, {include: [{association: 'artistas'},{association: 'medios'}]})
        .then(function(productoEncontrado) {
          /// borrar datos de artista no relevantes , solo dejar id, nombre y descripcion
            res.json(productoEncontrado);
        })
        //retorna un producto por id. Tener en cuenta datos de tablas rel (artista, categorias) y ruta img
    },
    allCategories: (req,res) => {
        db.Categoria.findAll()
        .then(
            function(categorias) {
                let cantDeCategorias = categorias.length;
                res.json({count: cantDeCategorias});
            })
        //retorna cant total de categorias
    }

 }

module.exports = controller;

