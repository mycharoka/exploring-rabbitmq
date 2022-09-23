const ampqp = require('amqplib/callback_api')

console.log('process arg', process.argv);

ampqp.connect("amqp://localhost", (errConn, connection) => {
  if (errConn) throw errConn

  connection.createChannel((errChannel, channel) => {
    if (errChannel) throw errChannel

    let queue = 'task_queue';
    let count= 1
    let msg = process.argv.slice(2).join(' ') || "Hello World!";
    channel.assertQueue(queue, {durable: true})

    
    
    
    setInterval(() => {
      channel.sendToQueue(queue, Buffer.from(msg), {persistent: true})

      console.log(`[X] Sent '%s'`, msg + count++);
      
    }, 1000)
  })
})