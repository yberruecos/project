const mongoose =require('mongoose')
const Schema =mongoose.Schema

const mySchema=new Schema({
    user_id:String,
    name:String,
    phone:String,
    adress:String,
    pedido:String,
    metodo:String
})

const model=mongoose.model('whatsappuser',mySchema)

module.exports=model