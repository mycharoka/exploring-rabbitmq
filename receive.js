const amqplib = require('amqplib/callback_api')

amqplib.connect("amqp://localhost", (errConn, connection) => {
  if (errConn) {
    throw errConn
  }

  connection.createChannel((errChannel, channel) => {
    if (errChannel) {
      throw errChannel
    }

    let queue = 'surprise'

    channel.assertQueue(queue, {durable: false})
    console.log(`[*] Waiting for message %s`, queue);

    channel.consume(queue, msg => {
      // let map = msg.map(idx => {
      //   return idx
      // })
      // console.log('Isi message : ', map);
      console.log('Message : ', msg);
      console.log(`[X] Message Received %s`, msg.content.toString());
    }, {noAck: true})

  })
})