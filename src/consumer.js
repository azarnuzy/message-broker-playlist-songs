require('dotenv').config()
const amqp = require('amqplib')
const PlaylistSongsService = require('./PlaylistSongsService')
const MailSender = require('./MailSender')
const Listener = require('./Listener')

const init = async () => {
  const playlistSongsService = new PlaylistSongsService()
  const mailSender = new MailSender()
  const listener = new Listener(playlistSongsService, mailSender)

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER)
  const channel = await connection.createChannel()

  await channel.assertQueue('exports:songsPlaylist', {
    durable: true,
  })

  channel.consume('exports:songsPlaylist', listener.listen, { noAck: true })
}

init()
