const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const favicon    = require('serve-favicon')
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('templatemo_458_lavish')); // Assuming your HTML file is in a 'public' folder

app.use(favicon(__dirname + '/templatemo_458_lavish/portfolio-images/favi.png'));
// GET route for the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/templatemo_458_lavish/index.html'); // Adjust the path based on your file structure
});

app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
     host: 'smtp.gmail.com',
     port: 465,
     secure: true,
     auth: {
      user: 'durotimiebenezer@gmail.com',
      pass: 'taga nhzn tekj jjns',
     },

           debug: true,
           logger: true,
           tls: {
                rejectUnauthorized: false
              }
  });

  const mailOptions = {
    from: 'ebenezerdurotimi8@gmail.com',
    to: 'ebenezerdurotimi8@gmail.com',
    subject: 'New Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).sendFile(__dirname + '/templatemo_458_lavish/Wrong.html');;
    } else {
      console.log('Email sent: ' + info.response);
      res.sendFile(__dirname + '/templatemo_458_lavish/index.html');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
