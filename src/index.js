const express = require('express');

const app = express();
const port = 5000;

app.get('/', (req, res)=>{
    res.send('Hello Exoooo!')
});

app.listen(port, ()=> console.log(`The app is running on http://localhost:${port}/`));
