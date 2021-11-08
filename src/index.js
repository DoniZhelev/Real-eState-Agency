const express = require('express');
const { PORT } = require('./constants');

const app = express();
require('./config/expressConfig')(app);
require('./config/hbsConfig')(app);


app.get('/', (req, res)=>{
    res.render('home' );
});

app.listen(PORT, ()=> console.log(`The app is running on http://localhost:${PORT}/`));
