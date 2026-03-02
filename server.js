import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const PORT= process.env.PORT || 5000;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

app.post("/send", async (req, res) => {
  const { name, phone, message } = req.body;

  try {
    console.log("FORM DATA:", req.body);

    const response = await axios.post(
      `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: process.env.YOUR_BUSINESS_NUMBER,
        type: "text",
        text: {
          body: `New Website Enquiry:

Name: ${name}
Phone: ${phone}

Message:
${message}`
        }
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("WHATSAPP SUCCESS:", response.data);

    res.json({ success: true });

  } catch (error) {
    console.error("WHATSAPP ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));