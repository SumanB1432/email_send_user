require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const functions = require("firebase-functions")
const allowedOrigins = [
  "http://localhost:3000",
  "https://www.jobformautomator.com"
];

const app = express();
app.use(express.json());
app.use(cors());
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

const EMAIL_USER="saurabhbelote112@gmail.com"
const EMAIL_PASS="gwfsprafralgduif"


app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure:true,
  host:'smtp.gmail.com',
  port:465,
  auth: {
    user: EMAIL_USER, // Your Gmail address
    pass: EMAIL_PASS, // Your Gmail App Password
  },
});





app.get("/",async(req,res)=>{
  return res.send({message:"Hello from welcome email!"})
})

app.post("/send-email", async (req, res) => {
  const { email, name } = req.body;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Welcome, ${name}!`,
      text: `
Hi ${name},

Welcome to Job Form Automator! We’re happy to have you here.

Watch Demo Video:
Click here: https://youtu.be/XUybldvVcc4?si=X-jK6JGAo0bC7nzZ
Or watch it directly: https://youtu.be/XUybldvVcc4?si=X-jK6JGAo0bC7nzZ

If you find any bugs or have questions, message me anytime at saurabh@jobformautomator.com or WhatsApp me at +91 9766116839.

I’m here to help!

Best,  
Saurabh  
Founder, Job Form Automator
      `,
      html: `
        <h3>Hi ${name},</h3>
        <p>Welcome to <strong>Job Form Automator</strong>! We’re happy to have you here.</p>

        <h4>🎥 Watch Demo Video:</h4>
        <p>
          <a href="https://youtu.be/XUybldvVcc4?si=X-jK6JGAo0bC7nzZ" target="_blank"
             style="display: inline-block; background-color: #0FAE96; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Click here to watch
          </a>
        </p>
        <p>Or watch it directly: <a href="https://youtu.be/XUybldvVcc4?si=X-jK6JGAo0bC7nzZ" target="_blank">https://youtu.be/XUybldvVcc4?si=X-jK6JGAo0bC7nzZ</a></p>

        <p>If you find any bugs or have questions, message me anytime at <a href="mailto:saurabh@jobformautomator.com">saurabh@jobformautomator.com</a> or WhatsApp me at <a href="https://wa.me/919766116839" target="_blank">+91 9766116839</a>.</p>

        <p>I’m here to help!</p>

        <p>Best,<br>Saurabh<br>Founder, Job Form Automator</p>
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
