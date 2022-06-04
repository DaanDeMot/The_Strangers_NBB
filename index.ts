const express = require('express');
const app = express();
const ejs= require('ejs'); 

app.set('view engine', 'ejs'); 
app.set('port', 3000);
app.use(express.static('views'));

app.get('/',(req:any,res:any)=>{
    res.render('index');
});

app.get('/history',(req:any,res:any)=>{
    res.render('history');
});

app.get('/history_detail',(req:any,res:any)=>{
    res.render('history_detail');
});

app.listen(app.get('port'), ()=>console.log( '[server] http://localhost:' + app.get('port')));