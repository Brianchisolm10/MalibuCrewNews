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

  // Add news (admin)
  router.post('/', (req, res) => {
    const { title, content, image_url } = req.body;
    db.run(
      'INSERT INTO news (title, content, image_url) VALUES (?, ?, ?)',
      [title, content, image_url],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, title, content, image_url });
      }
    );
  });

  return router;
}
