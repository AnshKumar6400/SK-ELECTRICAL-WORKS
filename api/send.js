import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, message } = req.body;

  try {
    await axios.post(
      `https://graph.facebook.com/v22.0/${process.env.PHONE_NUMBER_ID}/messages`,
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
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({
      error: error.response?.data || error.message
    });
  }
}