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
                    req.session.artistLogged = artistFound;
                 
                    if(req.body.remember-artist != undefined) {
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
           
    
    


       /*if(artistFound){
           let accesoPermitido= bcryptjs.compareSync(req.body.password, artistFound.password)
           if(accesoPermitido){
               delete artistFound.password
               req.session.artistLogged = artistFound;
            
               if(req.body.remember-artist != undefined) {
                res.cookie('artistEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
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
       }*/
    },
    register: (req, res)=>{
        res.render('registro_artista');
    },
    processRegister: (req, res) => {

        let errors = validationResult(req);

        // let artistFound = artist.findByField('email', req.body.email);


        // if(artistFound){
        //    return res.render('registro', {errors: 
        //         {email: 
        //             {msg:'Este email ya está registrado'}
        //         },
        //         oldData: req.body
        //         }
        //         )

        // }

         if (errors.isEmpty()) {

            let fecha = new Date();
            let dia= fecha.getDate();
            let mes = fecha.getMonth();
            let anio = fecha.getFullYear()
            let fechaActual = anio + '-' + mes + '-' + dia
    
            let artistToCreate = {
                    nombre_completo: req.body.nombre,
                    nombre_usuario: req.body.username,
                    domicilio: req.body.domicilio,
                    email: req.body.email,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    fecha_nacimiento: req.body.fecha_nacimiento,
                    img: req.file.filename,
                    fecha_alta: fechaActual,
                    fecha_baja: null
            };
            

            db.Artist.create(artistToCreate);

            res.redirect('/');

            } else {
                let artist= req.body;
                res.render('registro_artista', { errors: errors.mapped(), old: artist });
            }

        },

      perfilArtista: (req, res) => {

        return res.render('perfil_artista', {
			artist: req.session.artistLogged
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