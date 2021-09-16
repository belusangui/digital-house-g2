function artistMiddleware(req, res, next){
    if(!req.session.userLogged.username){
        return res.redirect('/');
    }
    next();
}

module.exports = artistMiddleware