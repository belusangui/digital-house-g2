const path = require('path');
const fs = require('fs');
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');

const db = require('../database/models');

let controller = {
    login: (req, res)=>{
        res.render('login_artista');
    },
    processLogin: (req, res) => {
        db.Artista.findOne({
            where: {
            email: req.body.email
            }
            }).then(function (artistFound) {
                
                if(artistFound){
                    let accesoPermitido= bcryptjs.compareSync(req.body.password, artistFound.password)
                    if(accesoPermitido){
                        delete artistFound.password
                        req.session.userLogged = artistFound;
                     
                        if(req.body.rememberArtist != undefined) {
                         res.cookie('artistEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                         }
         
                        res.redirect('/')
                    }else{
                        res.render('login_artista', {errors: {
                            password:{
                                msg: 'Las credenciales son invalidas'
                            }
                        }});
                    }
                }else{
                    res.render('login_artista', {errors: {
                        email:{
                            msg: 'No se encuentra este email'
                        }
                    }});
                }
            }).catch(function (error){
                res.render('login_artista', {errors: {
                    email:{
                        msg: 'Error'
                    }
                }})
            })
    
        },
        
    
    register: (req, res)=>{
        res.render('registro_artista');
    },
    processRegister: (req, res) => {

        let errors = validationResult(req);

        
        db.Artista.findOne({
            where: {
            email: req.body.email
            }
            }).then(function (artistFound) {

                if(artistFound){
                return res.render('registro_artista', {errors: 
                        {email: 
                            {msg:'Este email ya está registrado'}
                        },
                        oldData: req.body
                        })
                        

                }else{
                    db.Artista.findOne({
                        where: {
                            nombre_usuario: req.body.username
                        }
                    }).then(function(usernameFound){
                        if(usernameFound){
                            return res.render('registro_artista', {errors:
                                {username:
                                   {msg: 'Usuario ya existente'}
                                },
                                oldData: req.body
                            })
                        }else{
                     if (errors.isEmpty()) {
                    let fecha = new Date();
                    let dia= fecha.getDate();
                    let mes = fecha.getMonth();
                    let anio = fecha.getFullYear();
                    let fechaActual = anio + '-' + (mes + 1) + '-' + dia;

                    db.Artista.create({
                        nombre_completo: req.body.nombre,
                        nombre_usuario: req.body.username,
                        titular: req.body.titular,
                        biografia: req.body.biografia,
                        domicilio: req.body.domicilio,
                        email: req.body.email,
                        img: req.file.filename,
                        password:  bcryptjs.hashSync(req.body.password, 10),
                        fecha_nacimiento: req.body.fecha_nacimiento,
                        fecha_alta: fechaActual
                    }).then(function(resultado) {
                        res.redirect('/');
                    })
                
                
                    } else {
                        let user= req.body;
                        res.render('registro_artista', { errors: errors.mapped(), old: user });
                    }}
                    })
                    
                }
            })

        
        },


      perfilArtista: (req, res) => {

        return res.render('perfil_artista', {
			artist: req.session.userLogged
		});
    },

    edit: (req, res) => {
        console.log("Logica Editar artista")
    },
    
    editStore: (req, res) => {
        console.log("Logica Editar artista")
    },

    logout: (req, res) => {
        req.session.destroy();
        
        return res.redirect('/');
    }
    
}


module.exports = controller;