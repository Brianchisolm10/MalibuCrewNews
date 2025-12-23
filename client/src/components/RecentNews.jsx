import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RecentNews({ apiUrl }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${apiUrl}/news`);
        setNews(response.data);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [apiUrl]);

  if (loading) return <div className="loading">Loading news...</div>;

  return (
    <div className="recent-news">
      <h2>📰 Recent News</h2>
      <div className="news-list">
        {news.length === 0 ? (
          <p className="no-data">No news yet</p>
        ) : (
          news.map((item) => (
            <div key={item.id} className="news-item">
              {item.image_url && <img src={item.image_url} alt={item.title} />}
              <div className="news-content">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <small>{new Date(item.created_at).toLocaleString()}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
