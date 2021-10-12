function artistAuthMiddleware(req, res, next) {
    if(!req.session.userLogged){
        return res.redirect ('/artist/ingresar');
    }
    next();
}

module.exports = artistAuthMiddleware;