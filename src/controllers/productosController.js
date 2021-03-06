const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const db = require('../database/models');


let controller = {

    galeria: (req, res)=>{

        db.Producto.findAll({include: [ {association: 'artistas'}]})
        .then(function(dataproducts){
            res.render('galeria', {productos: dataproducts})
        });

    },

    detail: (req, res)=>{

        let idObra = req.params.id;
        db.Producto.findByPk(idObra, {include: [{association: 'artistas'},{association: 'medios'}]})
        .then(function(productoEncontrado) {
            res.render('detalle_producto', {producto : productoEncontrado})
        })

    },

    createProduct: (req, res) => {
        let allCategorias = db.Categoria.findAll()
            .then(function (categorias) {
                return categorias
        });
        let allMedios = db.Medio.findAll()
            .then(function (medios) {
            return medios
        });

        Promise.all([allCategorias, allMedios])
            .then(function([dataCategorias, dataMedios]){
                res.render('crear_producto',{categorias: dataCategorias, medios: dataMedios });
            })

    },

    storeProduct: (req, res) => {
        let errors = validationResult(req);

        if(errors.errors.length == 0){

            let nombreImagen = req.file.filename;

            let idArtista = req.session.userLogged.id;

            let productoNuevo = {
                        nombre: req.body.nombre,
                        id_artistaFk: idArtista,
                        id_medioFk: req.body.medio,
                        id_categoriaFk: req.body.categoria,
                        descripcion: req.body.descripcion,
                        precio: req.body.precio,
                        descuento: req.body.descuento,
                        ancho: req.body.ancho,
                        alto: req.body.alto,
                        otros_detalles: req.body.otros_detalles,
                        anio_creacion: req.body.year,
                        img: nombreImagen
                };

            db.Producto.create(productoNuevo).then(function(resultado) {
                res.redirect('/galeria');
            })
        }else{
            let allCategorias = db.Categoria.findAll()
            .then(function (categorias) {
                return categorias
            });
            let allMedios = db.Medio.findAll()
                .then(function (medios) {
                return medios
            });

            Promise.all([allCategorias, allMedios])
                .then(function([dataCategorias, dataMedios]){
                    res.render('crear_producto',{categorias: dataCategorias, medios: dataMedios, errors: errors.mapped(), old: req.body });
                })

        }

    },

    editProduct: (req, res) => {


        let allCategorias = db.Categoria.findAll()
            .then(function (categorias) {
                return categorias
        });
        let allMedios = db.Medio.findAll()
            .then(function (medios) {
            return medios
        });

        let id = req.params.id;

        let obra = db.Producto.findByPk(id).then(function(obraData){
            return obraData;
        })

        Promise.all([allCategorias, allMedios, obra])
            .then(function([dataCategorias, dataMedios, dataObra]){
                res.render('editar_producto',{categorias: dataCategorias, medios: dataMedios, obraAEditar: dataObra });
            })

    },

    updateProduct: (req, res) => {

        let idProducto = req.params.id;

        let errors = validationResult(req);
        if(errors.errors.length == 0){

            let nombreImagen = req.file.filename;

            let newDataProduct = {
                nombre: req.body.nombre,
                id_medioFk: req.body.medio,
                id_categoriaFk: req.body.categoria,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                descuento: req.body.descuento,
                ancho: req.body.ancho,
                alto: req.body.alto,
                otros_detalles: req.body.otros_detalles,
                anio_creacion: req.body.year,
                img: nombreImagen
            };

            db.Producto.findByPk(idProducto)
                .then(function(producto){
                    let imagenAnterior = producto.img;
                    fs.unlinkSync(path.join(__dirname, '../../public/img', imagenAnterior));  //borro imagen vieja
                })
                .then(db.Producto.update(newDataProduct, {where: {id: idProducto}}))
                .then(function(resultado){
                res.redirect('/galeria');
                });
            }else{
                let allCategorias = db.Categoria.findAll()
                .then(function (categorias) {
                    return categorias
                });
                let allMedios = db.Medio.findAll()
                    .then(function (medios) {
                    return medios
                });
        
                let id = req.params.id;
        
                let obra = db.Producto.findByPk(id).then(function(obraData){
                    return obraData;
                })
        
                Promise.all([allCategorias, allMedios, obra])
                    .then(function([dataCategorias, dataMedios, dataObra]){
                        res.render('editar_producto',{categorias: dataCategorias, medios: dataMedios, obraAEditar: dataObra, errors: errors.mapped(), old: req.body });
                    })
            }
        
    },

    delete: (req, res) => {

        let idToDelete = req.params.id;

        db.Producto.findByPk(idToDelete)
            .then(function(producto){
                let imagenAnterior = producto.img;
                fs.unlinkSync(path.join(__dirname, '../../public/img', imagenAnterior)); // borro imagen vieja
            })
            .then(db.Producto.destroy({where: {id: idToDelete}}) //borro producto de base de datos
                    .then(function(){
                        res.redirect('/galeria');
                    }))

    },
}

module.exports = controller;