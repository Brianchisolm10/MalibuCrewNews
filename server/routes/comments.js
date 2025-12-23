import express from 'express';
import jwt from 'jsonwebtoken';

export default function commentRoutes(db) {
  const router = express.Router();
  const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

  // Middleware to verify token
  const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };

  // Get all comments
  router.get('/', (req, res) => {
    db.all(
      'SELECT c.id, c.content, c.created_at, u.username FROM comments c JOIN users u ON c.user_id = u.id ORDER BY c.created_at DESC LIMIT 50',
      (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      }
    );
  });

  // Add comment (requires login)
  router.post('/', verifyToken, (req, res) => {
    const { content } = req.body;
    db.run(
      'INSERT INTO comments (user_id, content) VALUES (?, ?)',
      [req.user.id, content],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, content, username: req.user.username });
      }
    );
  });

  return router;
}
