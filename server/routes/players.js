import express from 'express';

export default function playerRoutes(db) {
  const router = express.Router();

  // Get all players
  router.get('/', (req, res) => {
    db.all('SELECT * FROM players ORDER BY number ASC', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  // Get single player
  router.get('/:id', (req, res) => {
    db.get('SELECT * FROM players WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Player not found' });
      res.json(row);
    });
  });

  // Add player (admin)
  router.post('/', (req, res) => {
    const { name, number, position, stats, image_url, bio } = req.body;
    db.run(
      'INSERT INTO players (name, number, position, stats, image_url, bio) VALUES (?, ?, ?, ?, ?, ?)',
      [name, number, position, JSON.stringify(stats), image_url, bio],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, name, number, position, stats, image_url, bio });
      }
    );
  });

  // Update player
  router.put('/:id', (req, res) => {
    const { name, number, position, stats, image_url, bio } = req.body;
    db.run(
      'UPDATE players SET name = ?, number = ?, position = ?, stats = ?, image_url = ?, bio = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, number, position, JSON.stringify(stats), image_url, bio, req.params.id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Player updated' });
      }
    );
  });

  return router;
}
