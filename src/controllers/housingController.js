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

    // let housingData = await housing.toObject();
    let tenants = housing.getTenants();

    let isAvailable = housing.availablePieces > 0;
    let isRented = housing.tenants.some(x => x._id == req.user?._id)
    
    let isOwner = housing.owner == req.user?._id
    let housingData = housing.toObject()
    res.render('details', {...housingData, isOwner, tenants, isAvailable, isRented});
});

    router.get('/:housingId/rent', async (req, res) =>{
    await housingService.addTenant(req.params.housingId, req.user._id);

       

        res.redirect(`/housing/${req.params.housingId}/details`);

    });
 
    router.get('/:housingId/delete', async (req, res) => {
        await housingService.delete(req.params.housingId);

            res.redirect('/housing')
    });

    router.get('/:housingId/edit', async (req, res ) =>{
        let housing  = await housingService.getOne(req.params.housingId);

        res.render('edit', {...housing.toObject()})
    })
    
    router.post('/:housingId/edit', async (req, res ) =>{
        let housing  = await housingService.updateOne(req.params.housingId, req.body);
        res.redirect(`details`)
    });

module.exports = router;