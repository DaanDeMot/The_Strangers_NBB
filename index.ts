const express = require('express');
const app = express();
app.set('port', 3000);

const ejs= require('ejs'); // EJS import
app.set('view engine', 'ejs'); // EJS als view engine

app.get('/',(req:any,res:any)=>{
    res.render('index');
});

app.get('/whoami',(req:any,res:any)=>{
    res.type('text/html');
    res.send('Hello World');
});


app.listen(app.get('port'), ()=>console.log( '[server] http://localhost:' + app.get('port')));