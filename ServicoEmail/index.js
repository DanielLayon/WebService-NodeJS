const nodemailer = require('nodemailer');

// Crie um transportador SMTP usando o módulo nodemailer
const transporter = nodemailer.createTransport({
  host: 'host',
  port: 587,
  tls: { 
    rejectUnauthorized: false
  },
  auth: {
    user: 'usuario',
    pass: 'senha'
  },
});

// Crie um objeto de mensagem de e-mail
const message = {
  from: 'from@teste.com',
  to: 'daniel.layon@outlook.com',
  subject: 'Assunto do e-mail',
  text: 'Meu teste',
  html: `Meu teste exemplo`
};

// Envie o e-mail usando o método sendMail do transportador
transporter.sendMail(message, (error, info) => {
  if (error) {
    console.log('Erro ao enviar e-mail:', error);
  } else {
    console.log('E-mail enviado:', info.response);
  }
});