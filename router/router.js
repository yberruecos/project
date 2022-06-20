const neetworkInfo=require('../components/availability/neetwork')
const neetworkLogin=require('../components/login/neetwork')
const neetworkWhatsApp=require('../components/WhatsApp/neetwork')

const router=(app)=>{
    app.use('/availability',neetworkInfo)
    .use('/login',neetworkLogin)
    .use('/whatsapp',neetworkWhatsApp)
}

module.exports=router