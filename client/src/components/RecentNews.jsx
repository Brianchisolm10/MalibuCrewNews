import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RecentNews({ apiUrl, currentUser }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [articleComments, setArticleComments] = useState({});
  const [commentText, setCommentText] = useState('');

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

  const fetchArticleComments = async (articleId) => {
    try {
      const response = await axios.get(`${apiUrl}/news/${articleId}/comments`);
      setArticleComments(prev => ({
        ...prev,
        [articleId]: response.data
      }));
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const handleExpandArticle = (article) => {
    setExpandedArticle(article);
    if (article.is_internal && !articleComments[article.id]) {
      fetchArticleComments(article.id);
    }
  };

  const handlePostComment = async (articleId) => {
    if (!commentText.trim() || !currentUser) return;

    try {
      await axios.post(`${apiUrl}/news/${articleId}/comments`, {
        userId: currentUser.id,
        content: commentText
      });
      setCommentText('');
      fetchArticleComments(articleId);
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  if (loading) return <div className="loading">Loading news...</div>;

  return (
    <>
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
                  <div className="article-badge">
                    {item.is_internal ? (
                      <span className="badge-internal">Malibu Crew</span>
                    ) : (
                      <span className="badge-external">Pepperdine</span>
                    )}
                  </div>
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
                  <div className="article-actions">
                    {item.is_internal ? (
                      <button 
                        className="read-more"
                        onClick={() => handleExpandArticle(item)}
                      >
                        Read More & Comment →
                      </button>
                    ) : (
                      <a 
                        href={item.article_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="read-more"
                      >
                        Read More →
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {expandedArticle && expandedArticle.is_internal && (
        <div className="article-detail-modal">
          <div className="article-detail-content">
            <button className="close-btn" onClick={() => setExpandedArticle(null)}>×</button>
            
            {expandedArticle.image_url && (
              <img src={expandedArticle.image_url} alt={expandedArticle.title} className="article-detail-image" />
            )}
            
            <div className="article-detail-body">
              <h2>{expandedArticle.title}</h2>
              <div className="article-detail-meta">
                <span className="article-detail-date">
                  {new Date(expandedArticle.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="article-detail-text">
                {expandedArticle.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="article-comments-section">
                <h3>Comments</h3>
                
                {currentUser ? (
                  <div className="comment-form">
                    <div className="comment-input-wrapper">
                      <div className="user-avatar">
                        {currentUser.username?.charAt(0).toUpperCase()}
                      </div>
                      <div className="input-area">
                        <textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Share your thoughts..."
                          rows="3"
                        />
                        <button 
                          onClick={() => handlePostComment(expandedArticle.id)}
                          disabled={!commentText.trim()}
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="login-prompt-card">
                    <p>Sign in to comment on this article</p>
                  </div>
                )}

                <div className="comments-list">
                  {articleComments[expandedArticle.id]?.length === 0 ? (
                    <p className="no-comments">No comments yet. Be the first to comment!</p>
                  ) : (
                    articleComments[expandedArticle.id]?.map((comment) => (
                      <div key={comment.id} className="comment-item">
                        <div className="comment-header">
                          <div className="comment-user">
                            <div className="user-avatar-small">
                              {comment.username?.charAt(0).toUpperCase()}
                            </div>
                            <div className="user-info">
                              <span className="username">{comment.username}</span>
                              <span className="comment-time">
                                {new Date(comment.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="comment-content">{comment.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
