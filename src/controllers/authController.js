const router = require('express').Router();

const authService = require('../services/authService');

router.get('/register', (req,res) =>{
    res.render('register');
});

router.get('/login', (req,res) =>{
    res.render('login');
});

router.post('/register', (req, res ) => {
    console.log(req.body);
});

module.exports = router;