const nodemailer = require('nodemailer')

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    })
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Open Music Api',
      to: targetEmail,
      subject: 'Ekspor lagu pada playlist',
      text: 'Terlampir hasil dari ekspor catatan',
      attachments: [
        {
          filename: 'playlistSongs.json',
          content,
        },
      ],
    }

    return this._transporter.sendMail(message)
  }
}

module.exports = MailSender
