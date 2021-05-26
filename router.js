const express = require('express');
const router = express.Router();

let credentials={
    email:'warunsharma.95@gmail.com',
    password:'Password'
}

// User Login
router.post('/login',(req,res)=>{
    if(req.body.email==credentials.email && req.body.password== credentials.password){
        req.session.user=req.body.email;
        res.redirect('/route/dashboard');
        res.end('Login Successfully');
    }
    else{
        res.end('Invalid User');
    }
})

// Route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user)
        res.render('dashboard',{user:req.session.user});
    else
        res.redirect('/');
})

// Route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log("Error while logging out");
        }
        else{
            res.render('index',{title:'Express',logout:'Logout successfully'})
        }
    })
})

module.exports=router