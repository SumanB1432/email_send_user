require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
console.log(process.env.EMAIL_USER,process.env.EMAIL_PASS)

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure:true,
  host:'smtp.gmail.com',
  port:465,
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
  },
});

app.post("/send-email", async (req, res) => {
  const { email, name } = req.body;


  try {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to Our App! 🎉",
        text: `Hello ${name},\n\nWelcome to our platform! Watch our demo video here: https://youtu.be/XUybldvVcc4?si=X-jK6JGAo0bC7nzZ`,
        html: `
          <h3>Hello ${name},</h3>
          <p>Welcome to our platform! We’re excited to have you onboard.</p>
          <p>Watch our demo video below:</p>
          <a href="https://youtu.be/XUybldvVcc4?si=X-jK6JGAo0bC7nzZ" target="_blank" 
             style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
             🎥 Watch Demo Video
          </a>
          <br><br>
          <p>Or you can watch it directly here:</p>
          <iframe width="560" height="315" src="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" frameborder="0" allowfullscreen></iframe>
        `,
      });
      

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Email sending failed" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
