module.exports={
    availability:(()=>{
        return new Promise((resolve,reject)=>{
            process.on('uncaughtException',(error,origin)=>{
                reject(`Ha ocurrido un error: ${error} desde ${origin}`)
            })
            resolve('Node Back')
        })
    })
}