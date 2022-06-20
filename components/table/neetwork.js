const express=require('express')
const { route } = require('../whatsApp/neetwork')
const router=express.Router()


router.get('/',(req,res)=>{
    res.send('data')
})

module.exports=router