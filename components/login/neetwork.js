const express=require('express')
const router=express.Router()
const { createSSRApp } =require('vue')
const { renderToString } = require('vue/server-renderer')


const app = createSSRApp({
    data: () => ({ msg: 'hello' }),
    template: `<div>{{ msg }}</div>`
})

const getHtml=async (app) => {
    const html = await renderToString(app)
    return html
    
  }

router.get('/',async(req,res)=>{
    const html=await getHtml(app)
    res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><link rel="icon" href="/favicon.ico" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Vite App</title><script type="module" crossorigin src="assets/index.33be1dcb.js"></script><link rel="modulepreload" href="assets/vendor.4b0c4eed.js"><link rel="stylesheet" href="component.css"></link><link rel="stylesheet" href="assets/index.5882e302.css"></head><body><img src="assets/ssr.png" class="imgnode"/><div id="app">${html}</div></body></html>`)
})

module.exports=router