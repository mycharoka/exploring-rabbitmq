const amqp = require('amqplib')

connect()

async function connect () {
  try {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const queue = "le_queue"

    const result = await channel.assertQueue(queue)
    console.log('result >> ', result);

    const message = {
      longitude: 10.96233,
      latitude: 49.80404
    }
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))

    console.log(`[x] Sent Coordinat: ${JSON.stringify(message)}!`);
  } catch (error) {
    console.error(error);
  }
}