const express=require('express')
const router=require('./router/router')
const app=express()
const PORT=8080

router(app)

app.listen(PORT,()=>{
    console.log(`Listen port ${PORT}`)
})


