const nodemailer = require('nodemailer');

const log = require('../config/log');

class EmailService {
  static async send(to, subject, html) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_ADDRESS,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: 'AMI - Acompanhamento da Melhor Idade',
        to,
        subject,
        html,
      });

      log.info(`Message sent to ${to}`);
    } catch (error) {
      log.error(error);
      throw error;
    }
  }
}

module.exports = EmailService;
