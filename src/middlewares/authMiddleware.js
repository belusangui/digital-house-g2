function authMiddleware(req, res, next) {
    if(!req.session.userLogged){
        return res.redirect ('/user/ingresar');
    }
    next();
}

module.exports = authMiddleware;