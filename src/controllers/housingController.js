const router = require('express').Router();
const housingService = require('../services/housingService')


router.get('/', async (req, res)=>{
    let housings =  await housingService.getAll()
    res.render('housingForRent',{ housings});

});

router.get('/create', (req, res)=>{
    res.render('create')
});

router.post('/create', async (req, res) =>{
    await housingService.create({...req.body, owner: req.user._id});


    res.redirect('/housing')
});

router.get('/:housingId/details',  async (req,res) =>{
    let housing = await housingService.getOne(req.params.housingId)
    

    let isOwner = housing.owner == req.user?._id

    res.render('details', {...housing, isOwner})
});

    router.get('/:housingId/rent', async (req, res) =>{
        let housing  = await housingService.getOne(req.params.housingId);

        housing.tenants.push(req.user._id)
        await housing.save()

        res.redirect(`/housing/${req.params.housingId}/details`);

    })


module.exports = router;