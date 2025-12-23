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
    const interval = setInterval(fetchNews, 5000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  if (loading) return <div className="loading">Loading news...</div>;

  return (
    <div className="recent-news">
      <div className="news-list">
        {news.length === 0 ? (
          <p className="no-data">No news yet</p>
        ) : (
          news.map((item) => (
            <article key={item.id} className="news-article">
              {item.image_url && (
                <div className="article-image">
                  <img src={item.image_url} alt={item.title} />
                </div>
              )}
              <div className="article-content">
                <h3 className="article-title">{item.title}</h3>
                <div className="article-meta">
                  <span className="article-date">
                    {new Date(item.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="article-excerpt">{item.excerpt || item.content.substring(0, 150)}</p>
                <a 
                  href={item.article_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="read-more"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
