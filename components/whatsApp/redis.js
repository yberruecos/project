const redis = require('ioredis');

const client = redis.createClient({
	host: 'redis-13943.c57.us-east-1-4.ec2.cloud.redislabs.com',
	port: 13943,
	password: 'ols2Wl1IEg0yJjyPDMkDfGnPVBWV5DJC'
})

client.on('connect', function() {
    console.log('Connected!');
  });

  client.on('error', err => {
    console.log('Error ' + err);
});

const DURATION=60


function list(table) {
    return new Promise(async(resolve, reject) => {
        client.get(table, (err, data) => {
            if (err) return reject(err);

            let res = data || null;
            // if (data) {
            //     res = JSON.parse(data);
            // }
            resolve(res);
        });
    });
}

async function upsert(table, data) {
    let key = table;
    client.setex(key, DURATION,data);
    return true;
}

module.exports = {
    list,
    upsert
};