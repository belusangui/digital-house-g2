const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../middlewares/authMiddleware');
const artistMiddleware = require('../middlewares/artistMiddleware');
const artistAuthMiddleware = require('../middlewares/artistAuthMiddleware');
const {body} = require('express-validator');
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

const validateCreation = [
    body('nombre').notEmpty().withMessage('Debes completar el nombre de la obra.'),
    body('artista').notEmpty().withMessage('Debes ingresar el nombre del artista.'),
    body('year').notEmpty().withMessage('Debes ingresar el año de creación de la obra.'),
    body('medio').notEmpty().withMessage('Debes ingresar una categoría de la obra.'),
    body('categoria').notEmpty().withMessage('Debes ingresar una categoría de la obra.'),
    body('ancho').notEmpty().withMessage('Debes ingresar el ancho de la obra.').bail().isDecimal().withMessage('Debes ingresar el ancho de la obra.'),
    body('alto').notEmpty().withMessage('Debes ingresar el alto de la obra.').bail().isDecimal().withMessage('Debes ingresar el alto de la obra.'),
    body('descripcion').notEmpty().withMessage('Debes ingresar una descripción de la obra.'),
    body('otros_detalles').notEmpty().withMessage('Debes ingresar otros detalles de la obra.'),
    body('precio').notEmpty().withMessage('Debes ingresar el precio de la obra.').bail().isNumeric().withMessage('Debes ingresar el precio de la obra.'),
    body('fotos').custom((value, { req }) => {
        let file = req.file;
        let extensionesValidas = ['.jpg', '.png'];
        
        if(!file){
            throw new Error('Debes seleccionar una imagen de la obra.');
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!extensionesValidas.includes(fileExtension))
            {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    }
    )
];

router.get ('/', productosController.galeria);

router.get ('/detalle_producto/:id', productosController.detail);

router.get ('/crear_producto', artistAuthMiddleware, artistMiddleware, productosController.createProduct);

router.post ('/crear_producto', uploadFile.single('fotos'),validateCreation, productosController.storeProduct);

router.get ('/editar_producto/:id', authMiddleware, artistMiddleware, productosController.editProduct);

router.put ('/editar_producto/:id', uploadFile.single('fotos'),productosController.updateProduct);

router.delete('/:id', productosController.delete);


module.exports = router;