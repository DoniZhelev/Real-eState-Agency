const router = require('express').Router();
const { AUTH_COOKIE_NAME } = require('../constants')

const authService = require('../services/authService');



router.get('/login', (req,res) =>{
    res.render('login');
});

router.post('/login', async (req,res)=> {
    const { username, password} = req.body;
    try {

      let token = await  authService.login({username, password});
      res.cookie(AUTH_COOKIE_NAME, token);

      res.redirect('/')
    } catch(err) {
        console.log(err);
        //TODO return notificationS
        res.end();
    }
})
 
router.get('/register', (req,res) =>{
    res.render('register');
});

router.post('/register', async(req, res ) => {
    
    const { name, username, password, repeatPassword} = req.body;

    if(password !== repeatPassword) {
        res.locals.error = 'Password mismatch';
        return  res.render('register')
    }
try {
   await authService.register({
        name,
        username,
        password,
        repeatPassword});
        

        res.redirect('/')
   } catch(err) {
       // TODO: return ERR
   }
});

module.exports = router;