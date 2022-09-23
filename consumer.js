const amqp = require('amqplib')


connect()

async function connect () {
  try {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const queue = "le_queue"

    const result = await channel.assertQueue(queue)
    // console.log('result >> ', result);

    
    channel.consume(queue, message => {
      console.log('messages >>> ', message.content.toString());
      const output = JSON.parse(message.content.toString())
      console.log('Received message: ', output);
    })
    
    console.log('Waiting for message');

  } catch (error) {
    console.error(error);
  }
}