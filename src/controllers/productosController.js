const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../databaseJson/products.json');
const productosArchivo = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

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
    },

    editProduct: (req, res) => {

        let id = req.params.id;
		let obraId;

		for (let obra of productosArchivo){
			if (id==obra.id){
				obraId=obra;
			}
		}
        res.render('editar_producto',{obraAEditar: obraId}); 
    },

    updateProduct: (req, res) => {

        let id = req.params.id;
    
        let imagenAnterior;

       for (let obra of productosArchivo){
			if (id==obra.id){
                 imagenAnterior = obra.img;
            }
       }

		for (let obra of productosArchivo){
			if (id==obra.id){
				obra.name= req.body.nombre;
				obra.artist= req.body.artista;
				obra.medium= req.body.medio;
				obra.category= req.body.tema;
				obra.description= req.body.descripcion;
                obra.price= req.body.precio;
                obra.discount= req.body.descuento;
                obra.width= req.body.ancho;
                obra.height= req.body.alto;
                obra.other_details= req.body.otros_detalles;
                obra.year= req.body.year;
                obra.img= req.file.filename;
				break;
                
			}
		}

		fs.writeFileSync(productsFilePath, JSON.stringify(productosArchivo,null,' '));

        fs.unlinkSync(path.join(__dirname, '../../public/img', imagenAnterior));

		res.redirect('/galeria');
    },

    delete: (req, res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let id = req.params.id;

        let ProductoEncontrado;

		let newProduct = products.filter(function(obra){
			return id!=obra.id;
		})

        for (let producto of products){
			if (producto.id == id){
			    ProductoEncontrado=producto;
			}
		}

		fs.unlinkSync(path.join(__dirname, '../../public/img', ProductoEncontrado.img));

		fs.writeFileSync(productsFilePath, JSON.stringify(newProduct,null,' '));

		res.redirect('/galeria');
    },
}

module.exports = controller;