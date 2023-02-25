const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  from: process.env.EMAIL,
});

function sendContactMail(contactData, res) {
  const { firstName, lastName, phone, email, dob, address, message } =
    contactData;

  const mailOptions = {
    from: '"Parish Dental Practice" <parishdental@gmail.com>',
    to: email,
    subject: `Your request for an appointment was received successfully`,
    text: ``,
    html: `
          <div>
            <p>Hello ${firstName} ${lastName},</p>
            <p>You have requested an appointment with a dentist at Parish Dental Practice. We will call you shortly on ${phone} or email you on ${email}. Please, be patient.</p>
            <p>Best regards.</p>
          </div>
        `,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("something is wrong", err);
      return res.status(400).send("Internal Server Error");
    } else {
      return res.status(200).send("Mail Sent");
    }
  });

  const mailOptions2 = {
    from: '"Parish Dental Practice" <parishdental@gmail.com>',
    to: "parishdental@gmail.com",
    subject: `You have a new appointment request from ${firstName} ${lastName}`,
    text: ``,
    html: `
          <div>
            <h3>Patient details:</h3>
            <p>Name: ${firstName} ${lastName}</p>
            <p>Phone: ${phone}</p>    
            <p>Email: ${email}</p>
            <p>Date of Birth: ${dob}</p> 
            <p>Address: ${address}</p>
            <p>Message: ${message}</p> 
          </div>
        `,
  };

  transporter.sendMail(mailOptions2, function (err, data) {
    if (err) {
      console.log("something is wrong", err);
      return res.status(400).send("Internal Server Error");
    } else {
      return res.status(200).send("Mail Sent");
    }
  });
}

app.post("/contact", (req, res) => {
  const contactData = req.body;
  sendContactMail(contactData, res);
});

app.get("/", (req, res) => {
  res.send("Home route");
});

app.listen(8080);
