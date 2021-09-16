const path = require('path');
const fs = require('fs');
const usersFilePath = path.join(__dirname, '../databaseJson/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const {validationResult} = require('express-validator');
const user = require('../models/user');
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
                 
                    if(req.body.remember-user != undefined) {
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
            res.render('login', {errors: {
                email:{
                    msg: 'Error'
                }
            }})
        })
           
    
    


       /*if(userFound){
           let accesoPermitido= bcryptjs.compareSync(req.body.password, userFound.password)
           if(accesoPermitido){
               delete userFound.password
               req.session.userLogged = userFound;
            
               if(req.body.remember-user != undefined) {
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
       }*/
    },
    register: (req, res)=>{
        res.render('registro');
    },
    processRegister: (req, res) => {

        let errors = validationResult(req);

        //let userFound = user.findByField('email', req.body.email);
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
                    })
                
                    res.redirect('/');
                
                    } else {
                        let user= req.body;
                        res.render('registro', { errors: errors.mapped(), old: user });
                    }
                    
                }
            })

        //  if (errors.isEmpty()) {

        //     let idNuevo = user.generateId();
            
        //     let userToCreate = {
        //         id: idNuevo,
        //             nombre_completo: req.body.nombre,
        //             domicilio: req.body.domicilio,
        //             email: req.body.email,
        //             password: bcryptjs.hashSync(req.body.password, 10),
        //             fecha_nacimiento: req.body.fecha_nacimiento
        //     };
            

        //     user.create(userToCreate);

        //     res.redirect('/');

        //     } else {
        //         let user= req.body;
        //         res.render('registro', { errors: errors.mapped(), old: user });
        //     }

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