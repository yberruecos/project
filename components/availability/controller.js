var axios = require("axios").default;


module.exports={
    availability:((fixture)=>{
        return new Promise((resolve,reject)=>{
            // process.on('uncaughtException',(error,origin)=>{
            //     reject(`Ha ocurrido un error: ${error} desde ${origin}`)
            // })
            let options={}
            if(fixture==='all'){
                options = {
                    method: 'GET',
                    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
                    params: {date: new Date().toISOString().slice(0, 10)},
                    headers: {
                      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
                      'x-rapidapi-key': '7dc50b2d28mshee1f63dad49bce4p1a3006jsn17c4e0435928'
                    }
                  };
            }else {
                options = {
                    method: 'GET',
                    url: 'https://api-football-v1.p.rapidapi.com/v3/predictions',
                    params: {fixture},
                    headers: {
                      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
                      'x-rapidapi-key': '7dc50b2d28mshee1f63dad49bce4p1a3006jsn17c4e0435928'
                    }
                  };
            }
              

            axios.request(options).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(`Ha ocurrido un error: ${error}`)
            });
        })
    })
}