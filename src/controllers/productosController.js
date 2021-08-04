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
            }
        }
        res.render('detalle_producto', {product : productoEncontrado});
    },
    createProduct: (req, res) => {
        res.render('crear_producto');
    },
    
    storeProduct: (req, res) => {
        //console.log(req.body);
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
            artist: req.body.artista,
            medium: req.body.medio,
            category: req.body.tema,
            description: req.body.descripcion,
            price: req.body.precio,
            discount: req.body.descuento,
            width: req.body.ancho,
            height: req.body.alto,
            other_details: req.body.otros_detalles,
            year: req.body.year,
            img: nombreImagen
        };

        console.log(productoNuevo);
        productosArchivo.push(productoNuevo);

        //(fs.readFileSync(productsFilePath, 'utf-8'));    Fede cual seria el proposito de esta linea? La comenté porque para mi no va.
        fs.writeFileSync(productsFilePath, JSON.stringify(productosArchivo, null, ' '));

        res.redirect('/galeria')
    },

    editProduct: (req, res) => {
        
        //let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        let id = req.params.id;
		let obraId;

		for (let obra of productosArchivo){
			if (id==obra.id){
				obraId=obra;
			}
		}
        res.render('editar_producto',{obraAEditar: obraId}); 
    },

    editStore: (req, res) => {
       
        //let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        let id = req.params.id;
        console.log("datos",req.body);


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