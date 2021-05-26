const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookies = require('cookie-parser')
const {v4:uuidv4} = require('uuid')

const router = require('./router');

const server = express();
const PORT = 2000;

server.set('view engine','ejs');
server.set('views','views');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));

//Load Static assets
server.use('/static',express.static(path.join(__dirname,'public')));
server.use('/assets',express.static(path.join(__dirname,'public/assets')))

server.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))

server.use('/route',router)

server.use(cookies())

server.get('/',(req,res)=>{
    res.render('index',{title:'Login System'});
});

server.listen(PORT,()=>{
    console.log('Server started at http://localhost:2000');
})