const path = require('path');
const fs = require('fs');
const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const {validationResult} = require('express-validator');
const user = require('../models/user');

let controller = {
    login: (req, res)=>{
        res.render('login');
    },
    processLogin: (req, res) => {
        console.log("process login")   //desarrollar
    },
    register: (req, res)=>{
        res.render('registro');
    },
    processRegister: (req, res) => {

        let errors = validationResult(req);

         if (errors.isEmpty()) {

            let idNuevo = user.generateId();

            let userToCreate = {
                id: idNuevo,
                    user_name: req.body.usuario,
                    full_name: req.body.nombre,
                    email: req.body.email,
                    password: req.body.password,
                    img: null  // implementar multer req.file
            };

            user.create(userToCreate);
                
            res.redirect('/');

            } else {
                let user= req.body;
                res.render('registro', { errors: errors.mapped(), old: user });
            }
        
        },

    perfilUsuario: (req, res) => {
        let idUser = req.params.id;
        let usuarioEncontrado;
        for (i=0; i<users.length; i++) {
            if(users[i].id == idUser) {
                usuarioEncontrado = users[i];
            }
        }
        
        res.render('perfil_usuario', {usuario: usuarioEncontrado});
    },

    edit: (req, res) => {
        console.log("Logica Editar usuario, no es necesaria para sprint 4")
    },
    
    editStore: (req, res) => {
        console.log("Logica Editar usuario, no es necesaria para sprint 4")
    },
    
}

module.exports = controller;