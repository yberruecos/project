const store=require('./store')
const redis=require('./redis')

// if (typeof localStorage === "undefined" || localStorage === null) {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./scratch');
//   }

const answers=[
    "<B>Pako:<B> Bienvenido \n\n gracias por comunicarte con\n 🍔@papikamedellín🍔 que quieres hacer? respondenos con:\n 1 🎫 Ver la carta \n 2 📝 Hacer el pedido",
    "Pako: Puedes ver la carta en el siguiente link https://papikaback.bonett.chat/public/carta%20papika.pdf",
    "Pako: Indicanos por favor tu barrio y dirrecion:",
    "Pako: Indicanos por favor el nombre del encargado:",
    "Pako: Cual es tu pedido?:",
    "Pako: Que metodo de pago utilizaras?:",
    "Pako: Gracias por preferirnos, Estamos procesando tu pedido, regalanos un momento porfavor. uno de nuestro agentes lo atenderá",
]


module.exports= {
    getMessagge:(client)=>{
        // localStorage.clear()
    return async(message) => {
            const key=await redis.list(message.from)
             
            if(message.body && key){
                // const key=localStorage.getItem(message.from)
                console.log(key,message.body)

                if(key==0 && message.body==1){
                    try {
                        client.sendMessage(message.from,answers[1])
                        setTimeout(()=>{
                            client.sendMessage(message.from,answers[0])
                        },300)
                        return false
                    } catch (error) {
                        console.log(`Ha ocurrido un error: ${error}`)
                    }
                }

                if(key==0 && message.body==2){
                    const user=await store.findUser(message.from)
                    if(user){
                        //localStorage.setItem(message.from,100);
                        await redis.upsert(message.from,100)
                        client.sendMessage(message.from,`Pako: Quieres que te enviemos el pedido a la direccion ${user.adress}, escribe:\n 1: Hacer pedido en la direccion \n 2: Indicar otra dirección`)
                        return false
                    }else {
                        //localStorage.setItem(message.from,2);
                        await redis.upsert(message.from,2)
                        client.sendMessage(message.from,answers[2])
                        return false
                    }
                }

                if(key==2){
                    const user=await store.findUser(message.from)
                    if(user){
                        user.adress=message.body
                        const newMessage=await user.save()
                        console.log(newMessage)
                    }else {
                        store.saveUser(message)
                    }
                }

                if(key==3){
                    const user=await store.findUser(message.from)
                    user.name=message.body
                    const newMessage=await user.save()
                    console.log(newMessage)
                }

                if(key==4){
                    const user=await store.findUser(message.from)
                    user.pedido=message.body
                    const newMessage=await user.save()
                    console.log(newMessage)
                }

                if(key==5){
                    const user=await store.findUser(message.from)
                    user.metodo=message.body
                    const newMessage=await user.save()
                    //localStorage.setItem(message.from,101);
                    await redis.upsert(message.from,101)
                    console.log(newMessage)
                    client.sendMessage(message.from,`Pako: La información de tu pedido es:\n Barrio y dirección: ${user.adress}\n Nombre de quien recibe: ${user.name}\n Pedido: ${user.pedido}\n Metodo de pago:${message.body}\n\n responde con 1 para confirmar o con 2 para cambiar.`);
                    return false
                }

                if(key==100 && message.body==1){
                    //localStorage.setItem(message.from,4);
                    await redis.upsert(message.from,4)
                    client.sendMessage(message.from,answers[4])
                    return false
                }

                if(key==100 && message.body==2){
                    //localStorage.setItem(message.from,2);
                    await redis.upsert(message.from,2)
                    client.sendMessage(message.from,answers[2])
                    return false
                }

                if(key==101 && message.body==1){
                    //localStorage.setItem(message.from,6);
                    await redis.upsert(message.from,6)
                    client.sendMessage(message.from,answers[6])
                    return false
                }

                if(key==101 && message.body==2){
                    const user=await store.findUser(message.from)
                    const newMessage=await user.delete()
                    console.log(newMessage)
                    //localStorage.setItem(message.from,0);
                    await redis.upsert(message.from,0)
                    client.sendMessage(message.from,answers[0])
                    return false
                }

                if(key==answers.length-1){
                    await redis.upsert(message.from,1000)
                    return false
                }

                if((message.body!=1 && message.body!=2) && (key==0 || key==100 || key ==101)){
                    client.sendMessage('Pako: debes escoger una opción valida')
                    client.sendMessage(message.from,answers[key])
                    return false
                }

                const keySave=parseInt(key)+1
                //localStorage.setItem(message.from,keySave);
                await redis.upsert(message.from,keySave)
                client.sendMessage(message.from,answers[keySave])
            }

            if(message.body==='!ping') {
                client.sendMessage(message.from, answers[0]);
                //localStorage.setItem(message.from, 0);
                await redis.upsert(message.from,0)
                setTimeout(async()=>{
                    const closeChat=await redis.list(message.from)
                    if(closeChat==0 || closeChat==null){
                        client.sendMessage(message.from, 'Pako: este chat se ha cerrado por inactividad.');
                    }
                },200000)
            }
        }
    }
}