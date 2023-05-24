const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: process.env.SENDINGBLUE_LOGIN,
    pass: process.env.SENDINGBLUE_PASS,
  },
});

function appointmentMail(contactData, res) {
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
            <p>You have requested an appointment with a dentist at Parish Dental Practice.</p>
            <p>
              Parish dental are approaching full capacity on our NHS list. We are currently prioritising patients who are under 18 for our NHS list.
            </p>

            <p>
              If you meet this criteria We will call you shortly on ${phone} or email you on ${email}.
            </p>
            <p>
              Please note, if you do not meet this criteria at this time you will be automatically placed on our NHS patients waiting list and will be contacted as soon as an NHS space becomes available.
            </p>

            <p>
              If you require urgent emergency dental care we can offer you a same day appointment through emergency247dentist
            </p>

             <p>
              You can book online via <a href="https://emergency247dentist.co.uk/" target="_blank">www.emergency247dentist.co.uk</a> <br />
              Or call on <a href="tel:0113 332 8354">0113 332 8354</a> <br />
              Or email <a href="mailto:hello@emergency247dentist.co.uk">hello@emergency247dentist.co.uk</a> <br />
            </p>
             <p>
              We do currently have spaces available on our private patient list, an examination starts at £35.00.
            </p>

             <p>
              You can view our full private price list via <br />
              <a href="https://www.parishdental.co.uk/pricing">www.parishdental.co.uk/pricing</a>
            </p>
            <p>
              If you would like to proceed with a private appointment please respond to this email.
            </p>
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

function contactMail(contactData, res) {
  const { firstName, lastName, phone, email, dob, address, message } =
    contactData;

  const mailOptions = {
    from: '"Parish Dental Practice" <parishdental@gmail.com>',
    to: email,
    subject: `Your request for an appointment was received successfully`,
    text: ``,
    html: `
          <div>
            <p>Dear ${firstName} ${lastName},</p>
            <p>Thank you for contacting Parish Dental Practice. We have received your message and will respond to your inquiry as soon as possible.</p>
            
            <p>
            Our team strives to provide excellent customer service, and we appreciate your patience during this process. If your inquiry requires immediate attention, please feel free to call us at 
            <a href="tel:01132638509">0113 263 8509</a>.
            </p>

            <p>
              We look forward to assisting you with your dental needs.
            </p>
            <p>Best regards.</p>
            <p>Parish Dental Practice</p>
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

app.post("/appointment", (req, res) => {
  const contactData = req.body;
  appointmentMail(contactData, res);
});

app.post("/contact", (req, res) => {
  const contactData = req.body;
  contactMail(contactData, res);
});

app.get("/", (req, res) => {
  res.send("Home route");
});

app.listen(8080);
