/**
 * Contact form routes
 * POST /api/contact - Submit contact form
 */

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { sendEmailNotification } = require('../utils/email');

// Validation helper
function validateContact(body) {
  const errors = [];
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (!body.email || typeof body.email !== 'string') {
    errors.push('Valid email is required');
  } else if (!/^\S+@\S+\.\S+$/.test(body.email)) {
    errors.push('Invalid email format');
  }
  if (!body.subject || typeof body.subject !== 'string' || body.subject.trim().length < 2) {
    errors.push('Subject must be at least 2 characters');
  }
  if (!body.message || typeof body.message !== 'string' || body.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  return errors;
}

/**
 * POST /api/contact
 * Submits contact form, stores in DB, optionally sends email
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const errors = validateContact(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors[0] || 'Validation failed',
      });
    }

    const newMessage = new Message({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    await newMessage.save();

    // Try to send email notification (optional - fails gracefully)
    try {
      await sendEmailNotification({ name, email, subject, message });
    } catch (emailErr) {
      console.warn('Email notification failed (message still saved):', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

module.exports = router;
