const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const productosArchivo = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


let controller = {

    galeria: (req, res)=>{
        
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('galeria', {productos: products})
    },
    detail: (req, res)=>{
       
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        
        let idObra = req.params.id;
        let productoEncontrado = {};

        for (let product of products) {
            if(product.id == idObra){
                productoEncontrado = product;
                res.render('detalle_producto', {product : productoEncontrado});
            };
        };
    },
    createProduct: (req, res) => {
        res.render('crear_producto');
    },
    
    storeProduct: (req, res) => {
        console.log(req.file)
       let idNuevo=0
      for(let p of productosArchivo){
          if(idNuevo<p.id){
              idNuevo=p.id
          }
      }
        idNuevo++;

        let nombreImagen= req.file.filename

        let productoNuevo={
            id: idNuevo,
            name: req.body.nombre,
            date: req.body.fecha,
            medium: req.body.medio,
            category: req.body.tema,
            description: req.body.descripcion,
            size: req.body.ancho + 'x' + req.body.alto + 'cm',
            price: req.body.precio,
            discount: req.body.descuento + '% off',
            img: nombreImagen
        };


        productosArchivo.push(productoNuevo);

        (fs.readFileSync(productsFilePath, 'utf-8'));
        fs.writeFileSync(productsFilePath, JSON.stringify(productosArchivo, null, ' '));

        res.redirect('/galeria')
    },

    editProduct: (req, res) => {
        
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        let id = req.params.id;
		let obraId;

		for (let obra of products){
			if (id==obra.id){
				obraId=obra;
			}
		}
        
		
        res.render('editar_producto',{obraAEditar: obraId}); 
    },

    editStore: (req, res) => {
       
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        let id = req.params.id;
        console.log("datos:",req.body);


		for (let obra of products){
			if (id==obra.id){
				obra.name= req.body.name;
				obra.artist= req.body.artist;
				obra.medium= req.body.medium;
				obra.category= req.body.category;
				obra.description= req.body.description;
                obra.size= req.body.size;
                obra.price= req.body.price;
                obra.discount= req.body.discount;
				break;
			}
		}

		fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));

		res.redirect('/');
    },

    delete: (req, res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let id = req.params.id;

		let newProduct = products.filter(function(obra){
			return id!=obra.id;
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(newProduct,null,' '));

		res.redirect('/galeria');
    },
}

module.exports = controller;