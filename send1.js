const amqplib = require('amqplib/callback_api')

amqplib.connect("amqp://localhost", (errConn, connection) => {

  if (errConn) {
    throw errConn
  }

  connection.createChannel((errChannel, channel) => {
    if (errChannel) {
      throw errChannel
    }

    let queue = "surprise"
    let msg = "mother"
    let count = 1

    
    channel.assertQueue(queue, {durable: false})
    
    setInterval(() => {
      let increment = count++
      let send = msg + increment
      channel.sendToQueue(queue, Buffer.from(send))
      console.log(`[x] Sent %s`, send);
    }, 1000)
  })
})