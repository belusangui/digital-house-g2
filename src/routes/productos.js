const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const productosController = require('../controllers/productosController');


const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/img'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: multerDiskStorage });


router.get ('/', productosController.galeria);

router.get ('/detalle_producto/:id', productosController.detail);

router.get ('/crear_producto', productosController.createProduct);

router.post ('/crear_producto', uploadFile.single('fotos'), productosController.storeProduct);

router.get ('/editar_producto/:id', productosController.editProduct);

router.put ('/editar_producto/:id', productosController.editStore);

router.delete('/:id', productosController.delete);


module.exports = router;