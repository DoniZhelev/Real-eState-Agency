const router = require('express').Router();
const housingService = require('../services/housingService')

router.get('/', (req, res)=>{
    res.render('housingForRent')
});

router.get('/create', (req, res)=>{
    res.render('create')
});

router.post('/create', async (req, res) =>{
    await housingService.create(req.body);


    res.redirect('/housing')
})


module.exports = router;