import { useState } from 'react';
import axios from 'axios';
import '../styles/admin.css';

export default function AdminDashboard({ user, token, apiUrl }) {
  const [activeTab, setActiveTab] = useState('players');
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    position: '',
    stats: '',
    bio: '',
    title: '',
    content: '',
    image_url: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    try {
      const stats = formData.stats ? JSON.parse(formData.stats) : {};
      await axios.post(`${apiUrl}/players`, {
        name: formData.name,
        number: parseInt(formData.number) || null,
        position: formData.position,
        stats,
        bio: formData.bio,
        image_url: formData.image_url,
      });
      setMessage('Player added successfully!');
      setFormData({ name: '', number: '', position: '', stats: '', bio: '', title: '', content: '', image_url: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error adding player: ' + err.response?.data?.error);
    }
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/news`, {
        title: formData.title,
        content: formData.content,
        image_url: formData.image_url,
      });
      setMessage('News added successfully!');
      setFormData({ name: '', number: '', position: '', stats: '', bio: '', title: '', content: '', image_url: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error adding news: ' + err.response?.data?.error);
    }
  };

  if (!user || !user.is_admin) {
    return <div className="admin-error">Access Denied. Admin only.</div>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'players' ? 'active' : ''}`}
          onClick={() => setActiveTab('players')}
        >
          Add Player
        </button>
        <button 
          className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          Add News
        </button>
      </div>

      {message && <div className="admin-message">{message}</div>}

      {activeTab === 'players' && (
        <form onSubmit={handleAddPlayer} className="admin-form">
          <h3>Add New Player</h3>
          
          <div className="form-group">
            <label>Player Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="e.g., John Doe"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Jersey Number</label>
              <input
                type="number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                placeholder="e.g., 23"
              />
            </div>

            <div className="form-group">
              <label>Position *</label>
              <select name="position" value={formData.position} onChange={handleInputChange} required>
                <option value="">Select Position</option>
                <option value="G">Guard (G)</option>
                <option value="F">Forward (F)</option>
                <option value="C">Center (C)</option>
                <option value="G/F">Guard/Forward (G/F)</option>
                <option value="F/C">Forward/Center (F/C)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="e.g., Hometown | High School"
              rows="2"
            />
          </div>

          <div className="form-group">
            <label>Stats (JSON)</label>
            <textarea
              name="stats"
              value={formData.stats}
              onChange={handleInputChange}
              placeholder='e.g., {"height": "6-2", "weight": "185", "year": "So."}'
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              placeholder="https://example.com/player.jpg"
            />
          </div>

          <button type="submit" className="submit-btn">Add Player</button>
        </form>
      )}

      {activeTab === 'news' && (
        <form onSubmit={handleAddNews} className="admin-form">
          <h3>Add News Article</h3>
          
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="News headline"
            />
          </div>

          <div className="form-group">
            <label>Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              placeholder="News article content"
              rows="6"
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              placeholder="https://example.com/news.jpg"
            />
          </div>

          <button type="submit" className="submit-btn">Add News</button>
        </form>
      )}
    </div>
  );
}
