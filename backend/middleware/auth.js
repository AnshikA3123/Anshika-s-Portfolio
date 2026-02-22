/**
 * Simple admin authentication middleware
 * For production, use JWT, sessions, or a proper auth library
 */

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    return res.status(500).json({
      success: false,
      message: 'Server misconfiguration: ADMIN_SECRET not set',
    });
  }

  if (!token || token !== adminSecret) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Invalid or missing token.',
    });
  }

  next();
};

module.exports = { adminAuth };
