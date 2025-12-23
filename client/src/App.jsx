import { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home';
import Login from './pages/Login';
import PlayerProfiles from './pages/PlayerProfiles';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import './index.css';

const API_URL = 'http://localhost:5001/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [token]);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-brand">
          <img src="/malibu-crew-logo.svg" alt="Malibu Crew News" className="logo" />
          <h1>Malibu Crew News</h1>
        </div>
        <div className="nav-links">
          <button onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'active' : ''}>
            Home
          </button>
          <button onClick={() => setCurrentPage('players')} className={currentPage === 'players' ? 'active' : ''}>
            Players
          </button>
          <button onClick={() => setCurrentPage('contact')} className={currentPage === 'contact' ? 'active' : ''}>
            Contact
          </button>
          {user ? (
            <>
              {user.is_admin && (
                <button onClick={() => setCurrentPage('admin')} className={currentPage === 'admin' ? 'active' : ''}>
                  Admin
                </button>
              )}
              <span className="user-info">Welcome, {user.username}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => setCurrentPage('login')} className={currentPage === 'login' ? 'active' : ''}>
              Login
            </button>
          )}
        </div>
      </nav>

      <main className="container">
        {currentPage === 'home' && <Home user={user} token={token} apiUrl={API_URL} />}
        {currentPage === 'login' && <Login onLogin={handleLogin} apiUrl={API_URL} />}
        {currentPage === 'players' && <PlayerProfiles apiUrl={API_URL} />}
        {currentPage === 'admin' && <AdminDashboard user={user} token={token} apiUrl={API_URL} />}
        {currentPage === 'contact' && <Contact />}
      </main>

      <Footer />
    </div>
  );
}
