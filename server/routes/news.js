import express from 'express';

export default function newsRoutes(db) {
  const router = express.Router();

  // Get all news
  router.get('/', (req, res) => {
    db.all('SELECT * FROM news ORDER BY created_at DESC LIMIT 20', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  // Get article comments
  router.get('/:articleId/comments', (req, res) => {
    const { articleId } = req.params;
    db.all(
      `SELECT ac.*, u.username FROM article_comments ac 
       JOIN users u ON ac.user_id = u.id 
       WHERE ac.article_id = ? 
       ORDER BY ac.created_at DESC`,
      [articleId],
      (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows || []);
      }
    );
  });

  // Add article comment
  router.post('/:articleId/comments', (req, res) => {
    const { articleId } = req.params;
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ error: 'Missing userId or content' });
    }

    db.run(
      'INSERT INTO article_comments (article_id, user_id, content) VALUES (?, ?, ?)',
      [articleId, userId, content],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, article_id: articleId, user_id: userId, content });
      }
    );
  });

  // Add news (admin)
  router.post('/', (req, res) => {
    const { title, content, excerpt, image_url, article_url, is_internal } = req.body;
    db.run(
      'INSERT INTO news (title, content, excerpt, image_url, article_url, is_internal) VALUES (?, ?, ?, ?, ?, ?)',
      [title, content, excerpt, image_url, article_url, is_internal !== undefined ? is_internal : 1],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, title, content, excerpt, image_url, article_url, is_internal });
      }
    );
  });

  return router;
}
