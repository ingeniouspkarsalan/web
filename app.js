const express = require('express');
const hbs = require('hbs'); //use for template rendering
var app = express();

const fs = require('fs');

hbs.registerPartials(__dirname+'/views/partials'); //registering hbs templs

hbs.registerHelper('useme',()=>{ // this is for global using widgets
    return 'Create by abcd';
});

app.use((req,res,next)=>{
    var log=`methods ${req.method}  ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('not working');
        }
    });
    next();
});

app.use((req,res,next)=>{
    res.render('maintaince.hbs');
});


app.set('view engine','hbs');//setting engine hbs

app.use(express.static(__dirname+'/public')); //setting dictory direct access

app.get('/',(req,res)=>{
    //res.send('<h1>Welcome Express.........</h1>');
    res.send({
        name: 'abcd',
        likes: [
            'Biking',
            'cities'
        ]
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:'about page',
        currentyear:new Date().getFullYear()
    });
});

app.get('/hi',(req,res)=>{
    res.send('Hi Express.........');
});
app.listen(9000);