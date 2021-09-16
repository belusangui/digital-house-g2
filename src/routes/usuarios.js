const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const uploadFile =  require('../middlewares/multerUsers');

const usersController = require('../controllers/usersController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const validateRegister = [
    body('nombre').notEmpty().withMessage('Debes completar con tu nombre y apellido'),
    body('email').isEmail().withMessage('Debes completar con un email válido'),
    body('domicilio').isLength({min:10, max:25}).withMessage('Domicilio inválido'),
    body('password').isLength({min:6, max:15}).withMessage('Contraseña debe tener entre 6-15 caractéres'),
    body('password2').notEmpty().withMessage('Debes validar tu contraseña')
];

router.get('/ingresar', guestMiddleware, usersController.login); 

router.post('/ingresar', usersController.processLogin);

router.get('/crear_cuenta',  guestMiddleware, usersController.register); 

router.post('/crear_cuenta', uploadFile.single('avatar'),validateRegister, usersController.processRegister);

router.get('/mi_perfil/:id', authMiddleware, usersController.perfilUsuario); //renderiza perfil de usuario con identificador

router.get('/mi_perfil/:id/edit', usersController.edit); // mostrar formulario de edicion que trae datos del usuario. No necesario para esta entrega. 

router.put('/mi_perfil/:id/edit', usersController.editStore); //guarda info de la edicion de perfil. No necesario para esta entrega.

router.get('/logout', usersController.logout);

module.exports= router;