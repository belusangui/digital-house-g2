function userLoggedMiddleware(req, res, next){
     res.locals.isLogged = false;
     console.log(req.session.userLogged);
     if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.usuarioLogueado = req.session.userLogged;
     }
    next();
}

module.exports = userLoggedMiddleware;