const express=require('express')
const router=require('./router/router')
const app=express()
const PORT=3000

router(app)

app.listen(PORT,()=>{
    console.log(`Listen port ${PORT}`)
})


