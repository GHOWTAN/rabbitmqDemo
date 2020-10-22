const fs = require('fs')
let http = require('http');
let Observer=require('./rabbitMq/Observer/Observer')
let intermediate = require('./rabbitMq/Intermediate/intermediate')
setTimeout(function(){
    intermediate();
    Observer();
},10000)

http.createServer( function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(fs.readFileSync('./helloworld.txt', 'utf8'));
    res.end();
}).listen(8080);
