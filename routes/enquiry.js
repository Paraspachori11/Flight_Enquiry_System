var express = require('express')
var router = express.Router()

var pool = require('./pool')

var upload = require('./multer')

var x = require('node-localstorage').LocalStorage;
localstorage = new x('./infobuffer');



router.get('/flightinterface',function(req,res){
    var info = JSON.parse(localstorage.getItem("login_info"))
    if(info){
        res.render('homepage',{message:''})
    }
    else{
        res.render('loginpage',{message:''})
    }
})

// router.get('/flightsubmit',function(req,res){
//     var days = (""+req.query.days)
//     pool.query("insert into flightinfo (flight_name,flight_type,seats,days,source,destination,arrival_time,departure_time,company,logo) values(?,?,?,?,?,?,?,?,?,?)",[req.query.flightname,req.query.flighttype,req.query.noofseats,days,req.query.source,req.query.destination,req.query.arrT,req.query.depT,req.query.companyname,req.query.logopic],function(error,result){
//         if(error)
//         {
//             res.render('homepage',{'message':'Server Error'})
//         }
//         else{
//             res.render('homepage',{'message':'Record Submitted Successfully'})
//         }
//     })
// })

router.post('/flightsubmit',upload.single('logopic'),function(req,res){
    // console.log("bodydata",req.body)
    // console.log("Filedata",req.file)
    var days = (""+req.body.days)
    pool.query("insert into flightinfo (flight_name,flight_type,seats,days,source,destination,arrival_time,departure_time,company,logo) values(?,?,?,?,?,?,?,?,?,?)",[req.body.flightname,req.body.flighttype,req.body.noofseats,days,req.body.source,req.body.destination,req.body.arrT,req.body.depT,req.body.companyname,req.file.originalname],function(error,result){
        if(error)
        {
            res.render('homepage',{'message':'Server Error'})
        }
        else{
            res.render('homepage',{'message':'Record Submitted Succesfully'})
        }
    })
})

router.get('/fillcities',function(req,res){
    pool.query("select * from cities",function(error,result){
        if(error)
        {
            res.status(500).json({result:[],message:error})
        }
        else
        {
            res.status(200).json({result:result,message:'success'})
        }
    })
})

// router.get('/displayflightdata',function(req,res){
//     pool.query("select * from flightinfo",function(error,result){
//         if(error)
//         {
//             res.render("datadisplay",{data:[],message:error})
//         }
//         else
//         {
//             res.render("datadisplay",{data:result,message:'success'})
//         }
//         console.log(result)
//     })
// })

router.get('/displayflightdata',function(req,res){
    pool.query("select F.*,(select C.citiesname from cities C where C.idcities=F.source) as sourcecity,(select C.citiesname from cities C where C.idcities=F.destination) as destinationcity from flightinfo F",function(error,result){
        var info = JSON.parse(localstorage.getItem("login_info"))
        if(info)
        {
            if(error)
            {
                res.render("datadisplay",{data:[],message:error})
            }
            else
            {
                res.render("datadisplay",{data:result,message:'success'})
            }
        }

        else{
            res.render('loginpage',{message:'Enter Credentials'})
        }
        // console.log(result)
    })
})


router.get('/flightupdateinitiate',function(req,res){
    pool.query("select F.*,(select C.citiesname from cities C where C.idcities=F.source) as mysource,(select C.citiesname from cities C where C.idcities=F.destination) as mydestination from flightinfo F where flight_id=?",[req.query.fid],function(error,result){
        var info = JSON.parse(localstorage.getItem("login_info"))
        if(info){
            if(error){
                // console.log(error)
                res.render('flightedit',{data:[]})
            }
            else{
                // console.log(result[0])  it will fetch JSON only              {}
                // console.log(result)     it will fetch JSON within array      [{}]
                res.render('flightedit',{data:result[0]})
            }
        }
        else{
            res.render('loginpage',{message:'Enter Credentials'})
        }
    })
})

router.post('/flightupdatecomplete',function(req,res){
    if(req.body.btn=='Edit')
    {
        var days = (""+req.body.days)
        // console.log(days)
        pool.query("update flightinfo set flight_name=?, flight_type=?, seats=?, days=?, source=?, destination=?, arrival_time=?, departure_time=?, company=? where flight_id=?",[req.body.flightname,req.body.flighttype,req.body.noofseats,days,req.body.source,req.body.destination,req.body.arrT,req.body.depT,req.body.companyname,req.body.flightid],function(error,result){
            if(error){
                // console.log(error)
                res.redirect('/flightenquiry/displayflightdata')
            }
            else{
                res.redirect('/flightenquiry/displayflightdata')
            }
        })
    }
    else{
        pool.query("delete from flightinfo where flight_id=?",[req.body.flightid],function(error,result)
        {
            if(error){
                // console.log(error)
                res.redirect('/flightenquiry/displayflightdata')
            }
            else{
                res.redirect('/flightenquiry/displayflightdata')
            }
        })
    }
})

router.get('/imageupdateinitiate',function(req,res){
    pool.query("select flight_id,flight_name,flight_type,company,logo from flightinfo where flight_id=?",[req.query.fid],function(error,result){
        var info = JSON.parse(localstorage.getItem("login_info"))
        if(info){
            if(error){
                // console.log(error)
                res.render('imgupdate',{data:[]})
            }
            else{
                res.render('imgupdate',{data:result[0]})
            }
        }
        else{
            res.render('loginpage',{message:''})
        }
    }) 
})
 
router.post('/imageupdatecomplete',upload.single('logopic'),function(req,res){
    pool.query("update flightinfo set logo=? where flight_id=?",[req.file.originalname,req.body.flightid],function(error,result){
        if(error){
            // console.log(error)
            res.redirect('/flightenquiry/displayflightdata')
        }
        else{
            res.redirect('/flightenquiry/displayflightdata')
        }
    })
})

module.exports = router