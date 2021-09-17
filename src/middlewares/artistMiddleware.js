function artistMiddleware(req, res, next){
    if(!req.session.userLogged.nombre_usuario){
        return res.redirect('/');
    }
    next();
}

module.exports = artistMiddleware