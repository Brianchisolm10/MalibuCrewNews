import { useState } from 'react';

export default function PlayerCard({ player }) {
  const [showBio, setShowBio] = useState(false);
  const stats = typeof player.stats === 'string' ? JSON.parse(player.stats) : player.stats;

  return (
    <>
      <div className="player-card">
        {player.image_url && <img src={player.image_url} alt={player.name} />}
        <div className="player-info">
          <h3>#{player.number} {player.name}</h3>
          <p className="position">{player.position}</p>
          {stats?.year && <p className="year">{stats.year}</p>}
          <div className="player-stats-card">
            {stats?.height && <p><span className="stat-label">Ht:</span> {stats.height}</p>}
            {stats?.weight && <p><span className="stat-label">Wt:</span> {stats.weight}</p>}
          </div>
          <button className="learn-more-btn" onClick={() => setShowBio(true)}>Learn More</button>
        </div>
      </div>

      {showBio && (
        <div className="player-modal">
          <div className="player-modal-content">
            <button className="close-btn" onClick={() => setShowBio(false)}>×</button>
            
            <div className="player-modal-header">
              {player.image_url && <img src={player.image_url} alt={player.name} className="modal-image" />}
              <div className="player-modal-info">
                <h2>#{player.number} {player.name}</h2>
                <p className="modal-position">{player.position}</p>
                {stats?.year && <p className="modal-year">{stats.year}</p>}
              </div>
            </div>

            <div className="player-modal-body">
              <h3>Biography</h3>
              <div className="bio-text">
                {player.bio?.split('\n\n').map((section, idx) => (
                  <p key={idx}>{section}</p>
                ))}
              </div>

              {stats && Object.keys(stats).length > 0 && (
                <div className="player-stats">
                  <h3>Stats</h3>
                  <div className="stats-grid">
                    {Object.entries(stats).map(([key, value]) => (
                      <div key={key} className="stat-item">
                        <span className="stat-label">{key}:</span>
                        <span className="stat-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
