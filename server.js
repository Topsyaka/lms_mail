const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const pass = '123456789lms';
const user = 'testlmsacc2018@gmail.com'
const settings = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass
  }
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to mail sender');
});

app.post('/mail', (req, res) => {
  const {
    text,
    email
  } = req.body;
  const mailOptions = {
    from: user,
    to: email,
    subject: 'Sending Email using Node.js',
    text: text
  };

  settings.sendMail(mailOptions, function(error, info){
    if (error) {
      res.status(500);
      res.send('Sry mail have not been send.' + error);
    } else {
      res.send('Email sent: ' + info.response);
    }
  });
  
});

app.listen(3000);