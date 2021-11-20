const express = require('express');
const { PORT } = require('./constants');


const app = express();

const routes = require('./routes');
const { initDatabase } = require('./config/databaseConfig')

require('./config/expressConfig')(app);
require('./config/hbsConfig')(app);

app.use(routes);


initDatabase()
.then(()=>{
    app.listen(PORT, ()=> console.log(`The app is running on http://localhost:${PORT}/`));

})
.catch(err =>{
    console.log('Cannon connect database', err);
});
