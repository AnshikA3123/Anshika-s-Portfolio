/**
 * Portfolio Backend - Node.js + Express + MongoDB
 * - Contact form API
 * - Admin panel API (protected)
 * - Serves static frontend
 */

require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

// Serve static frontend (parent directory)
const frontendPath = path.join(__dirname, '..');
app.use(express.static(frontendPath));

// Admin panel page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(frontendPath, 'admin.html'));
});

// 404 page
app.get('/404', (req, res) => {
  res.status(404).sendFile(path.join(frontendPath, '404.html'));
});

// SPA fallback - serve index for root, 404 for unknown HTML routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  if (req.path === '/' || req.path === '') {
    return res.sendFile(path.join(frontendPath, 'index.html'));
  }
  // For unknown paths, serve 404
  res.status(404).sendFile(path.join(frontendPath, '404.html'));
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
