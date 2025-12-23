import { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerCard from '../components/PlayerCard';

export default function PlayerProfiles({ apiUrl }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState('All');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/players`);
        setPlayers(response.data);
      } catch (err) {
        console.error('Error fetching players:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
    const interval = setInterval(fetchPlayers, 5000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  // Get unique positions
  const positions = ['All', ...new Set(players.map(p => p.position).filter(Boolean))];

  // Filter players by position
  const filteredPlayers = selectedPosition === 'All' 
    ? players 
    : players.filter(p => p.position === selectedPosition);

  if (loading) return <div className="loading">Loading players...</div>;

  return (
    <div className="player-profiles">
      <h2>Team Roster</h2>
      
      <div className="position-filters">
        {positions.map((pos) => (
          <button
            key={pos}
            className={`filter-btn ${selectedPosition === pos ? 'active' : ''}`}
            onClick={() => setSelectedPosition(pos)}
          >
            {pos}
          </button>
        ))}
      </div>

      <div className="players-grid">
        {filteredPlayers.length === 0 ? (
          <p className="no-data">No players found for this position</p>
        ) : (
          filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))
        )}
      </div>
    </div>
  );
}
