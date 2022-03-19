const express=require('express')
const router=express.Router()
const controller=require('./controller')

router.get('/',(req,res)=>{
    controller.availability()
    .then((data)=>{
        res.status(200).send(data)
    })
    .catch((error)=>{
        console.log(`Ha ocurrido un eror ${error}`)
    })
})


module.exports=router