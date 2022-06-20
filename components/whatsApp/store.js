const model=require('./model')

module.exports={
    saveUser:async(message)=>{
        try {
            const saved=new model({
                "user_id":message._data.id.id,
                "phone":message.from,
                "adress":message.body
            })
            
            console.log(await saved.save())
        } catch (error) {
            console.log(`ERROR:${error}`)
        }
    },
    findUser:async(from)=>{
        try {
            const res=await model.findOne({"phone":from})

            return res
        } catch (error) {
            console.log(`ERROR:${error}`)
        }
    }
}