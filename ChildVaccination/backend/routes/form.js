const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const nodemailer = require('nodemailer');
// Twilio API credentials
const accountSid = 'ACe977749d747f864eb377a9337232aac4';
const authToken = '9915f649a1b03c02c74fdd634379bf2e';
const twilioNumber = '+18146215868';

// Create a Twilio client instance
const client = twilio(accountSid, authToken);

// API endpoint to send a message
router.post('/send-message', async (req, res) => {
  try {
    console.log("I am the try bock in form.js")
    const { mobileNumber, messageContent } = req.body;

    // Send the SMS message
    const message = await client.messages.create({
      body: messageContent,
      from: twilioNumber,
      to: mobileNumber,
    });

    // Return success response
    res.json({ success: true, messageSid: message.sid });
  } catch (error) {
    console.error('Failed to send message:', error);
    // Return error response
    res.status(500).json({ success: false, error: error.message });
  }
});

// router.post("/send-verification-email", (req, res) => {
//   const { email } = req.body;

//   // Replace this part with your actual code to send the verification email
//   // For example, using a third-party email service like SendGrid or Nodemailer
//   // For simplicity, let's assume it always returns success
//   const emailSentSuccessfully = true;

//   if (emailSentSuccessfully) {
//     res.json({ message: "Verification email sent successfully." });
//   } else {
//     res.status(500).json({ message: "Failed to send verification email." });
//   }
// });
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'clp05154@gmail.com', // Replace with your email
    pass: 'iutglqtmhsvcseub', // Replace with your password
  },
});
router.post('/send-verification-email', (req, res) => {
  const { email } = req.body;
 console.log(email);
  // Compose the email
  const mailOptions = {
    from: 'clp05154@gmail.com', // Replace with your email
    to: email,
    subject: 'Email Verification',
    text: 'Please verify your email address by clicking on the link below...',
    // Add the verification link here (e.g., a link to your verification page)
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send verification email.');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Verification email sent successfully.');
    }
  });
});

module.exports = router;
