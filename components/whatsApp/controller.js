const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const whatsAppBot=require('./whatsAppBot')
const qrImage = require('qr-image');

module.exports={
    wconnect:()=>{
        return new Promise((resolve,reject)=>{
            let client = new Client({
                puppeteer: { 
                    headless: true, 
                    args: ['--no-sandbox'] 
                }, 
                clientId: 'client-one'
            });

            client.on('qr', (qr) => {
                qrcode.generate(qr, {small: true},(qrcode)=>{
                    console.log(qrcode)
                    //resolve(`<div style="position: relative;display: flex;flex: none;align-items: center;justify-content: center;width: 264px;height: 264px;overflow: hidden;" data-ref="${qrcode}"><canvas width="264" height="264" aria-label="Scan me!" role="img"></canvas></div>`)
                    //resolve(`<img src="${qrcode}">`)
                    const coderes=qrImage.image(qr, { type: 'svg' });
                    resolve(coderes)
                })
            });

            client.on('ready', () => {
                console.log('Client is ready!');
            });

            client.on('message',whatsAppBot.getMessagge(client) );
            
            client.initialize();
        })
    }
}