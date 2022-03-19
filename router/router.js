const neetworkInfo=require('../components/availability/neetwork')

const router=(app)=>{
    app.use('/availability',neetworkInfo)
}

module.exports=router