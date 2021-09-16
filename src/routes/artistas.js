const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const uploadFile =  require('../middlewares/multerUsers');

const artistController = require('../controllers/artistController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const validateRegister = [
    body('nombre').notEmpty().withMessage('Debes completar con tu nombre y apellido'),
    body('username').notEmpty().withMessage('Debes ingresar un nombre de usuario'),
    body('email').isEmail().withMessage('Debes completar con un email válido'),
    body('domicilio').isLength({min:10, max:25}).withMessage('Domicilio inválido'),
    body('password').isLength({min:6, max:15}).withMessage('Contraseña debe tener entre 6-15 caractéres'),
    body('password2').notEmpty().withMessage('Debes validar tu contraseña')
];//agregar campos faltantes

router.get('/ingresar', guestMiddleware, artistController.login); 

router.post('/ingresar', artistController.processLogin);

router.get('/crear_artista',  guestMiddleware, artistController.register); 

router.post('/crear_artista', uploadFile.single('avatar'),validateRegister, artistController.processRegister);

router.get('/mi_perfil/:id', authMiddleware, artistController.perfilArtista); //renderiza perfil de usuario con identificador

router.get('/mi_perfil/:id/edit', artistController.edit); // mostrar formulario de edicion que trae datos del usuario. No necesario para esta entrega. 

router.put('/mi_perfil/:id/edit', artistController.editStore); //guarda info de la edicion de perfil. No necesario para esta entrega.

router.get('/logout', artistController.logout);

module.exports= router;