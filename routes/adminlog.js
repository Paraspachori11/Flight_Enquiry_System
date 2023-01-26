var express = require('express')
var router = express.Router()

var pool = require('./pool')
var upload = require('./multer')

var x = require('node-localstorage').LocalStorage;
localstorage = new x('./infobuffer');

router.get('/login',function(req,res){
    res.render('loginpage',{message:''})
})

router.get('/logout',function(req,res){
    localstorage.clear()
    res.render('loginpage',{message:''})
})

router.post('/checkinfo',function(req,res){
    pool.query("select * from administrator where (email=? or mobile=?) and password=?",[req.body.email,req.body.email,req.body.pwd],function(error,result){
        if(error){
            res.render('loginpage',{message:'Server Error'})
        }
        else{
            if(result.length==1)
            {
                localstorage.setItem("login_info",JSON.stringify(result[0]))
                res.render('dashboard',{data:result[0],message:''})
            }
            else{
                res.render('loginpage',{message:'Incorrect Login Credentals..'})
            }
        }
    })
})

module.exports = router