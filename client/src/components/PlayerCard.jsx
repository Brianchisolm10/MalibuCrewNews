export default function PlayerCard({ player }) {
  const stats = typeof player.stats === 'string' ? JSON.parse(player.stats) : player.stats;

  return (
    <div className="player-card">
      {player.image_url && <img src={player.image_url} alt={player.name} />}
      <div className="player-info">
        <h3>{player.name}</h3>
        <p className="position">{player.position}</p>
        {player.number && <p className="number">#{player.number}</p>}
        {player.bio && <p className="bio">{player.bio}</p>}
        {stats && (
          <div className="stats">
            <h4>Stats</h4>
            <ul>
              {Object.entries(stats).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
