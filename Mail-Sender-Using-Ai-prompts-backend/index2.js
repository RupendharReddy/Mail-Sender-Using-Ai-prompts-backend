import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rupendhar8374204359@gmail.com',
    pass: 'kjmr wllz xxdk zerg'
  }
});

var mailOptions = {
  from: '21102157@rmd.ac.in',
  to: 'varugurupendharreddy@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});