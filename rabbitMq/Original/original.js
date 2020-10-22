#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'my_o';
    let msg = 'MSG_';
    var exchange = 'logs';
    channel.assertExchange(exchange, 'fanout', {
        durable: false
      });
    channel.assertQueue(queue, {
      durable: false
    });
    let i=0;
    setInterval(()=>{
        i++;
        let messageNum=i;
        let sentMessage=msg+messageNum;
        channel.publish(exchange, '', Buffer.from(sentMessage));
        channel.sendToQueue(queue, Buffer.from(sentMessage));
        console.log(sentMessage)
    },3000)
    console.log("#Start sending message from [ORIG]");
  });
  setTimeout(function() {
    connection.close();
    process.exit(0);
}, 10000);
});