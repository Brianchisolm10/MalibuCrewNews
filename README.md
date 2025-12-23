# Malibu Crew News

A live basketball player updates website with fan comments, recent news, and player profiles.

## Features

- **Live Updates**: Player stats and news refresh every 5 seconds
- **Fan Comments**: Logged-in users can post comments about the team
- **Player Profiles**: View team roster with stats and bios
- **Recent News**: Stay updated with the latest team news
- **User Authentication**: Secure login/register system

## Project Structure

```
malibu-crew-news/
├── server/          # Node.js/Express backend
├── client/          # React frontend
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   PORT=5000
   JWT_SECRET=your-secret-key-here
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The client will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Players
- `GET /api/players` - Get all players
- `GET /api/players/:id` - Get single player
- `POST /api/players` - Add new player (admin)
- `PUT /api/players/:id` - Update player (admin)

### News
- `GET /api/news` - Get recent news
- `POST /api/news` - Add news (admin)

### Comments
- `GET /api/comments` - Get all comments
- `POST /api/comments` - Post comment (requires login)

## Adding Data

### Add a Player

```bash
curl -X POST http://localhost:5000/api/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "number": 23,
    "position": "Guard",
    "stats": {"PPG": 18.5, "APG": 4.2, "RPG": 3.1},
    "image_url": "https://example.com/player.jpg",
    "bio": "Star player for Malibu Crew"
  }'
```

### Add News

```bash
curl -X POST http://localhost:5000/api/news \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Malibu Crew Wins Championship",
    "content": "The team secured a historic victory...",
    "image_url": "https://example.com/news.jpg"
  }'
```

## Technologies Used

- **Frontend**: React, Vite, Axios
- **Backend**: Node.js, Express, SQLite
- **Authentication**: JWT, bcryptjs
- **Styling**: CSS3

## Live Updates

The app polls the backend every 5 seconds for:
- Player updates
- News updates
- Comments

You can adjust the polling interval in the component files (search for `setInterval`).

## Future Enhancements

- WebSocket integration for real-time updates
- Admin dashboard for managing content
- ESPN API integration
- Player comparison tool
- Game schedule and scores
- Social media integration
