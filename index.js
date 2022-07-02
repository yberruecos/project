// require('@babel/register')({
//     presets: ['@babel/preset-env', '@babel/preset-vue'],
//   });
  
const dotenv=require('dotenv')
const express=require('express')
const cors = require('cors');
const router=require('./router/router')
const app=express()
const db=require('./db')
// const PORT=3000

// require('asset-require-hook')({
//     extensions: ['jpg','png'],
//     name: '[hash].[ext]'
// })

dotenv.config()
// const {PORT,ENV}=process.env

// if(ENV==='develoment'){
//     console.log('ENV DEV')
// }

router(app)

app.use(cors())

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

// app.use(express.static("."));

app.listen(port,()=>{
    console.log(`Listen port ${port}`)
})


