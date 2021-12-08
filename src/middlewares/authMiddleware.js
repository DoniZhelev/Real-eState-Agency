const {AUTH_COOKIE_NAME, JWT_SECRET} = require('../constants')

const jwt = require('../utils/jwt');

exports.auth =  function(req,res, next) {
    let token = req.cookies[AUTH_COOKIE_NAME];

    if(token) {
        jwt.verify(token, JWT_SECRET)
        .then(decodedToken =>{
            req.user = decodedToken;
            next();
        })
        .catch(err =>{
            res.status(401).render('404');
        })
    } else {
        next();
    }
};

exports.isAuth = function(req, res, next) {
    if(req.user) {
        next()
    } else {
        res.redirect('/login');
    }
}