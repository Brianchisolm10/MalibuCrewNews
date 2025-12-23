import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FanComments({ user, token, apiUrl }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/comments`);
        setComments(response.data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
    const interval = setInterval(fetchComments, 5000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      await axios.post(`${apiUrl}/comments`, { content: newComment }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewComment('');
      const response = await axios.get(`${apiUrl}/comments`);
      setComments(response.data);
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) return <div className="loading">Loading comments...</div>;

  return (
    <div className="fan-comments">
      <div className="comments-header">
        <h2>💬 Community Discussion</h2>
        <p className="comments-subtitle">{comments.length} comments</p>
      </div>

      {user ? (
        <form onSubmit={handleSubmitComment} className="comment-form">
          <div className="comment-input-wrapper">
            <div className="user-avatar">{user.username.charAt(0).toUpperCase()}</div>
            <div className="input-area">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about the team..."
                rows="3"
              />
              <button type="submit" disabled={!newComment.trim()}>
                Post Comment
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="login-prompt-card">
          <p>Join the conversation! Sign up to comment on the latest team news.</p>
          <button onClick={() => setShowSignup(true)} className="signup-btn">
            Sign Up to Comment
          </button>
        </div>
      )}

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-data">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <div className="comment-user">
                  <div className="user-avatar-small">
                    {comment.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <strong className="username">{comment.username}</strong>
                    <span className="comment-time">{formatTime(comment.created_at)}</span>
                  </div>
                </div>
              </div>
              <p className="comment-content">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
