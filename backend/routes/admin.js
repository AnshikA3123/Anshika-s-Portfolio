/**
 * Admin routes - protected
 * GET /api/admin/messages - List all contact messages
 * PATCH /api/admin/messages/:id - Mark as read/replied
 */

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { adminAuth } = require('../middleware/auth');

// All admin routes require authentication
router.use(adminAuth);

/**
 * GET /api/admin/messages
 * Returns all contact messages (newest first)
 */
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: messages,
      count: messages.length,
    });
  } catch (err) {
    console.error('Admin get messages error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
    });
  }
});

/**
 * PATCH /api/admin/messages/:id
 * Update message (mark read, replied)
 */
router.patch('/messages/:id', async (req, res) => {
  try {
    const { read, replied } = req.body;
    const update = {};

    if (typeof read === 'boolean') update.read = read;
    if (typeof replied === 'boolean') update.replied = replied;

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    res.json({
      success: true,
      data: message,
    });
  } catch (err) {
    console.error('Admin update message error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update message',
    });
  }
});

module.exports = router;
