import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  try {
    await resend.emails.send({
      // Resend's free tier requires this exact sender address
      // until you verify your own domain with them.
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: "adelekeilesanmi739@gmail.com",

      subject: `New message from ${name}`,
      reply_to: email,
      text: `From: ${name} (${email})\n\n${message}`,
    });

    return res.status(200).json({ message: "Thank you! Your message has been sent." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
}
