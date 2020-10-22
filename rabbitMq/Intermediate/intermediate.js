const intermediate = () =>{

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq3', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var exchange = 'logs';

        channel.assertExchange(exchange, 'fanout', {
          durable: false
        });

        var queue = 'my_i';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.assertQueue('', {
            exclusive: true
          }, function(error2, q) {
            if (error2) {
              throw error2;
            }
            channel.bindQueue(q.queue, exchange, '');
      
            channel.consume(q.queue, function(msg) {
                let returnString= "Got "+msg.content.toString();
                console.log("Got ", msg.content.toString());
                setTimeout(() => {
                    channel.sendToQueue(queue, Buffer.from(returnString));
                    }, 1000);
            }, {
              noAck: true
            });
          });

          console.log("#Start receiving message from [IMED]");

    });
});
/*
            setTimeout(function(){
                channel.sendToQueue(sendToQueue, Buffer.from(receivedMes));
            },1000)
*/
}

module.exports =  intermediate;