const db = require('../database/models');

let controller = {

    users: (req,res) => {
        db.Comprador.findAll({
            attributes: ['id', 'nombre_completo']
          })
        .then(
            function(usuarios) {
                let cantDeUsuarios = usuarios.length;
                res.json({count: cantDeUsuarios, usuarios:usuarios});
            })
        // devuelve un objecto con propiedad count (cant de usuarios) y propiedad users con arreglo con datos de todos los usuarios (excepto datos sensibles)
    },
    userId: (req,res) => {
        let id = req.params.id;
        
        db.Comprador.findByPk(id)
        .then(function(usuarioEncontrado) {
          /// borrar datos de artista no relevantes , solo dejar id, nombre y descripcion
      
            res.json({id: usuarioEncontrado.id, nombre: usuarioEncontrado.nombre_completo});
        }).catch(function (error){
            res.json( {Error: 'Usuario inexistente'})
        })
        //retorna un usuario por id
    },
    lastUser: (req, res) => {
        db.Comprador.findAll({attributes: ['id', 'nombre_completo', 'email']})
        .then(
            function(usuarios) {
                let last = usuarios.pop()
                res.json({last});
            })
    },
    artists: (req, res) => {
        db.Artista.findAll({
            attributes: ['id', 'nombre_completo']
          })
        .then(
            function(artistas) {
                let cantDeArtistas = artistas.length;
                res.json({count: cantDeArtistas, artistas:artistas});
            })
        //idem usuarios pero artistas.
    },
    artistId: (req,res) => {
        let id = req.params.id
        
        db.Artista.findByPk(id)
        .then(function(artistaEncontrado) {
      
            res.json({id: artistaEncontrado.id, nombre: artistaEncontrado.nombre_completo});
        }).catch(function (error){
            res.json( {Error: 'Artista inexistente'})
        })
        //retorna un usuario por id
    },
    lastArtist: (req, res) => {
        db.Artista.findAll({attributes: ['id', 'nombre_completo', 'titular', 'img', 'nombre_usuario']})
        .then(
            function(artistas) {
                let last = artistas.pop()
                res.json({last});
            })
    },
    allProducts: (req,res) => {

        let cantDeDataProducts = db.Producto.findAll({include: [ {association: 'artistas'}]})
        .then(function(dataProducts){
            return  dataProducts.length;
        }
        );
        let dataProducts = db.Producto.findAll()
        .then(function(dataProducts){
            return  dataProducts;
        }
        );
           
           let sumaCat1 = db.Producto.count({include: [ {association: 'artistas'}],
            where: {
                id_categoriaFk: 1
            }
            })
            .then(function (id_1) {
                return id_1
            });
           
            let sumaCat2 = db.Producto.count({include: [ {association: 'artistas'}],
            where: {
                id_categoriaFk: 2
            }
            })
            .then(function (id_2) {
                return id_2
            });
            let sumaCat3 = db.Producto.count({include: [ {association: 'artistas'}],
            where: {
                id_categoriaFk: 3
            }
            })
            .then(function (id_3) {
                return id_3
            });
            let sumaCat4 = db.Producto.count({include: [ {association: 'artistas'}],
            where: {
                id_categoriaFk: 4
            }
            })
            .then(function (id_4) {
                return id_4
            });
            let sumaCat5 = db.Producto.count({include: [ {association: 'artistas'}],
            where: {
                id_categoriaFk: 5
            }
            })
            .then(function (id_5) {
                return id_5
            });
            let sumaCat6 = db.Producto.count({include: [ {association: 'artistas'}],
            where: {
                id_categoriaFk: 6
            }
            })
            .then(function (id_6) {
                return id_6
            });
            let sumaCat7 = db.Producto.count({include: [ {association: 'artistas'}],
            where: {
                id_categoriaFk: 7
            }
            })
            .then(function (id_7) {
                return id_7
            });
            Promise.all([dataProducts, cantDeDataProducts, sumaCat1, sumaCat2, sumaCat3, sumaCat4, sumaCat5, sumaCat6, sumaCat7])
            .then(function([dataProducts, cantDeDataProducts, sumaCat1, sumaCat2, sumaCat3, sumaCat4, sumaCat5, sumaCat6, sumaCat7]){
                res.json({ dataProducts: dataProducts, count: cantDeDataProducts, cantRetrato: sumaCat1, cantUrbano: sumaCat2, cantNaturaleza: sumaCat3, cantAutoretrato: sumaCat4, cantPaisajismo: sumaCat5, cantDesnudo: sumaCat6, cantAbstracto: sumaCat7 });
            });
        //retorna un objecto con la estructura count( cant de productos)  y products (arreglo de todos los productos) y cant de productos por categoria
    },
    productId: (req,res) => {
        let idObra = req.params.id
        db.Producto.findByPk(idObra, {
            include: [
              {
                association: 'artistas',
                attributes: [ 'id','nombre_completo' ] 
              },{association: 'medios'}]})
        .then(function(productoEncontrado) {
          /// borrar datos de artista no relevantes , solo dejar id, nombre y descripcion
            res.json(productoEncontrado);
        })
        //retorna un producto por id. Tener en cuenta datos de tablas rel (artista, categorias) y ruta img
    },
    lastProduct: (req,res) => {
        db.Producto.findAll({
            include: [
              {
                association: 'artistas',
                attributes: [ 'id','nombre_completo' ] 
              },{association: 'medios'}]})
        .then(function(productos) {
          let lastProductDataBase = productos.pop()
            res.json(lastProductDataBase);
        })
        //retorna un producto por id. Tener en cuenta datos de tablas rel (artista, categorias) y ruta img
    },
    allCategories: (req,res) => {
        db.Categoria.findAll()
        .then(
            function(categorias) {
                let cantDeCategorias = categorias.length;
                res.json({count: cantDeCategorias, categorias: categorias});
            })
        //retorna cant total de categorias
    }

 }

module.exports = controller;

