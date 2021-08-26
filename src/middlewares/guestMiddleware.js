function guestMiddleware(req, res, next){
    
    if(req.session.userLogged){
        let userId = req.session.userLogged.id 
        return res.redirect('/user/mi_perfil/'+ userId );
    }
    next();
}

module.exports = guestMiddleware;