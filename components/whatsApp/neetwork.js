const express = require('express')
const router=express.Router()
const controller=require('./controller.js')


router.get('/',async (req,res)=>{
    const qr=await controller.wconnect()
    //res.type('png');
    res.type('svg');
    qr.pipe(res);
    //res.send(qr)
})

module.exports=router