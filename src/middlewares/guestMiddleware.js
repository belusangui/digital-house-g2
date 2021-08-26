function guestMiddleware(req, res, next){
    if(req.session.userLogged){
        return res.redirect('/user/mi_perfil/:id');
        //return res.redirect('/');
    }
    next();
}

module.exports = guestMiddleware;