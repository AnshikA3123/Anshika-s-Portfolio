/**
 * Email utilities - Nodemailer
 * Sends notification when contact form is submitted
 */

const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

/**
 * Send email notification when contact form is submitted
 */
async function sendEmailNotification({ name, email, subject, message }) {
  const transport = getTransporter();
  if (!transport) {
    throw new Error('Email not configured');
  }

  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  if (!adminEmail) {
    throw new Error('Admin email not configured');
  }

  await transport.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `[Portfolio] ${subject}`,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
    text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
  });
}

module.exports = { sendEmailNotification, getTransporter };
