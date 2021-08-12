const util = require('util'); 
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const logger = require('./logger/logger');
const port = 3333;

const app = express();
app.use(express.json());
// this allows us to send arrays and complex objects to server using the urlencoded format
app.use(express.urlencoded({ extended: true }));
// we use express static to servce static files public is the folder name 
app.use(express.static('public'));
// helps secure your apps by setting various HTTP headers
app.use(helmet());

// we can enable morgan if env is in development mode 
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('morgan middleware enabled')
    console.log(`ready to log http requests on port http://localhost:${port}/`);
};

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`NODE_ENV using app.get: ${app.get('env')}`);

// our own middleware in a separate module
app.use(logger);



// REDIS FUN STARTS HERE!!!  



const redis = require("redis");
const redisUrl = "redis://127.0.0.1:6379"
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get)

client.on("error", function(error) {
console.error(error);
});

app.get('/set', (req, res, next) => {
    let key = "grokking"; 
    let value = "coding"; 
    client.set(key, value, redis.print);    
    res.send(`your key value is: ${key}:${value}`); 
}); 


app.get('/get', async (req, res, next) => {
        
    let value = await client.get('grokking'); 

    console.log(`log value ${value}`);     

    res.send(value)
}); 


app.get('/clear_all', (req, res, next) => {    
    client.flushall(); 
    res.send(`all redis data has been cleared`); 
}); 



app.listen(port);
console.log(`listening on ${port}`);