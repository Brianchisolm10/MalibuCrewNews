import { useState, useEffect } from 'react';
import RecentNews from '../components/RecentNews';
import FanComments from '../components/FanComments';

export default function Home({ user, token, apiUrl }) {
  return (
    <div className="home">
      <div className="home-grid">
        <div className="main-content">
          <RecentNews apiUrl={apiUrl} />
        </div>
        <div className="sidebar">
          <FanComments user={user} token={token} apiUrl={apiUrl} />
        </div>
      </div>
    </div>
  );
}
