const db=require('mongoose')

db.Promise=global.Promise
//  db.connect('mongodb+srv://userdb:<123db>@cluster0.s3f8u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
//      useNewUrlParser:true
//  })

 db.connect('mongodb://userdb:123db@cluster0-shard-00-00.s3f8u.mongodb.net:27017,cluster0-shard-00-01.s3f8u.mongodb.net:27017,cluster0-shard-00-02.s3f8u.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-mq629x-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('[db] Conectada con éxito'))
  .catch(err => console.error('[db]', err));