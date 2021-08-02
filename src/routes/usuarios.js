const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const usersController = require('../controllers/usersController');

const validateRegister = [
    body('nombre').notEmpty().withMessage('Debes completar con tu nombre y apellido'),
    body('email').isEmail().withMessage('Debes completar con un email válido'),
    body('usuario').isLength({min:6, max:15}).withMessage('Nombre de usuario debe tener entre 6-15 caractéres'),
    body('password').isLength({min:6, max:15}).withMessage('Contraseña debe tener entre 6-15 caractéres'),
    body('password2').notEmpty().withMessage('Debes validar tu contraseña')
];

router.get('/ingresar', usersController.login);

router.get('/crear_cuenta', usersController.register);

router.post('/crear_cuenta', validateRegister, usersController.store);

router.get('/mi_perfil/:id', usersController.perfilUsuario); //renderiza perfil de usuario con identificador

router.get('/mi_perfil/:id/edit', usersController.edit); // mostrar formulario de edicion que trae datos del usuario. No necesario para esta entrega. 

router.put('/mi_perfil/:id/edit', usersController.editStore); //guarda info de la edicion de perfil. No necesario para esta entrega.

module.exports= router;