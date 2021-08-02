let controller ={
    index: (req, res)=>{
        res.render('index');
    },
    contact: (req, res)=>{
        res.render('contact');
    },
    about: (req, res)=>{
        res.render('about');
    },
}

module.exports= controller;