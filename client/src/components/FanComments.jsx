import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FanComments({ user, token, apiUrl }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

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
    const interval = setInterval(fetchComments, 5000); // Poll every 5 seconds
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
      // Refresh comments
      const response = await axios.get(`${apiUrl}/comments`);
      setComments(response.data);
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  if (loading) return <div className="loading">Loading comments...</div>;

  return (
    <div className="fan-comments">
      <h2>💬 Fan Comments</h2>
      {user ? (
        <form onSubmit={handleSubmitComment} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts about the team..."
            rows="3"
          />
          <button type="submit">Post Comment</button>
        </form>
      ) : (
        <p className="login-prompt">Login to post comments</p>
      )}
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-data">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <strong>{comment.username}</strong>
              <p>{comment.content}</p>
              <small>{new Date(comment.created_at).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
