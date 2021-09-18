const path = require('path');
const fs = require('fs');
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');

const db = require('../database/models');

let controller = {
    login: (req, res)=>{
        res.render('login');
    },
    processLogin: (req, res) => {

        db.Comprador.findOne({
        where: {
        email: req.body.email
        }
        }).then(function (userFound) {
            
            if(userFound){
                let accesoPermitido= bcryptjs.compareSync(req.body.password, userFound.password)
                if(accesoPermitido){
                    delete userFound.password
                    req.session.userLogged = userFound;
                 
                    if(req.body.rememberUser != undefined) {
                     res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                     }
     
                    res.redirect('/')
                }else{
                    res.render('login', {errors: {
                        password:{
                            msg: 'Las credenciales son invalidas'
                        }
                    }});
                }
            }else{
                res.render('login', {errors: {
                    email:{
                        msg: 'No se encuentra este email'
                    }
                }});
            }
        }).catch(function (error){
            console.log("el error es:", error);
            res.render('login', {errors: {
                email:{
                    msg: 'Error'
                }
            }})
        })
           

    },
    register: (req, res)=>{
        res.render('registro');
    },
    processRegister: (req, res) => {

        let errors = validationResult(req);

        
        db.Comprador.findOne({
            where: {
            email: req.body.email
            }
            }).then(function (userFound) {

                if(userFound){
                return res.render('registro', {errors: 
                        {email: 
                            {msg:'Este email ya está registrado'}
                        },
                        oldData: req.body
                        }
                        )

                }else{
                    if (errors.isEmpty()) {

                    db.Comprador.create({
                        nombre_completo: req.body.nombre,
                        domicilio: req.body.domicilio,
                        email: req.body.email,
                        password:  bcryptjs.hashSync(req.body.password, 10),
                        fecha_nacimiento: req.body.fecha_nacimiento,
                    }).then(function(resultado) {
                        res.redirect('/');
                    })
                
                
                    } else {
                        let userToLog = req.body;
                        res.render('registro', { errors: errors.mapped(), old: userToLog });
                    }
                    
                }
            })

        
        },

    perfilUsuario: (req, res) => {

        return res.render('perfil_usuario', {
			user: req.session.userLogged
		});
    },

    edit: (req, res) => {
        console.log("Logica Editar usuario, no es necesaria para sprint 4")
    },
    
    editStore: (req, res) => {
        console.log("Logica Editar usuario, no es necesaria para sprint 4")
    },

    logout: (req, res) => {
        req.session.destroy();
        
        return res.redirect('/');
    }
    
}


module.exports = controller;