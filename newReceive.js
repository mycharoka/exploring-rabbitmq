const amqplib = require('amqplib/callback_api')

amqplib.connect("amqp://localhost", (errConn, connection) => {
  if (errConn) {
    throw errConn
  }

  connection.createChannel((errChannel, channel) => {
    if (errChannel) {
      throw errChannel
    }

    let queue = 'task_queue'

    channel.assertQueue(queue, {durable: true})
    console.log(`[*] Waiting for message %s`, queue);

    channel.consume(queue, msg => {
      let secs = msg.content.toString().split('.').length - 1

      // console.log('Message : ', msg);
      console.log(`[X] Message Received %s`, msg.content.toString());

      setInterval(() => {
        console.log(`[x] Received!`);
      }, secs * 3000)

      
    }, {noAck: true})

  })
})