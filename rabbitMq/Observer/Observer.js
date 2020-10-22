#!/usr/bin/env node

const fs= require('fs');

fs.writeFile('helloworld.txt', '', function (err) {
    if (err) return console.log(err);
  });

var amqp = require('amqplib/callback_api');

const getCurrentDate = () =>{
    let date = new Date();
    return date.toISOString();
}

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'my_o';
        let queue_myi = "my_i"
        channel.assertQueue(queue, {
            durable: false
        });

        channel.assertQueue(queue_myi, {
            durable: false
        });
        console.log("#Start receiving message from [OBSE]");

        channel.consume(queue, function(msg) {
            let date = getCurrentDate()
            let formString = date+ " Topic " + queue + ":" +msg.content.toString()+"\n";
            fs.appendFile('helloworld.txt', formString, function (err) {
                if (err) return console.log(err);
              });
            console.log(formString);
        }, {
            noAck: true
        });

        channel.consume(queue_myi, function(msg) {
            let date = getCurrentDate()
            let formString = date+ " Topic " + queue_myi + ":" +msg.content.toString()+"\n" ;
            fs.appendFile('helloworld.txt', formString, function (err) {
                if (err) return console.log(err);
              });
            console.log(formString);
        }, {
            noAck: true
        });


    });
});