# Leaderboard Task App

A full-stack application that allows users to claim random points and view real-time leaderboard rankings.

## Features

- **User Management**: Add new users and select from existing users
- **Point Claiming**: Claim random points (1-10) for selected users
- **Real-time Leaderboard**: Dynamic ranking based on total points
- **Claim History**: Track all point claims in the database
- **Modern UI**: Clean, responsive design with Tailwind CSS

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- CORS for cross-origin requests

### Frontend
- React.js + TypeScript
- Tailwind CSS for styling
- Fetch API for HTTP requests

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (MongoDB Atlas Cloud)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the backend directory with:
   ```
   PORT=5000
   MONGODB_URI=Your Cloud Cluster UI
   ```
   

4. **Seed the database with initial users:**
   ```bash
   npm run seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## API Endpoints

### Users
- `GET /api/users` - Get all users (sorted by points)
- `POST /api/users` - Add new user
- `POST /api/users/:userId/claim` - Claim points for user

### Claims
- `GET /api/claims/history` - Get claim history
- `GET /api/claims/history/:userId` - Get user's claim history

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  totalPoints: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### ClaimHistory Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  userName: String,
  points: Number (1-10),
  createdAt: Date,
  updatedAt: Date
}
```

## Usage

1. **Add Users**: Use the "Add New User" form to create new users
2. **Select User**: Choose a user from the dropdown
3. **Claim Points**: Click "Claim Points" to award random points (1-10)
4. **View Leaderboard**: See real-time rankings in the leaderboard table
5. **View History**: Check recent claims in the claim history panel

## Testing

### API Testing
Run the test script to verify all endpoints:
```bash
node test-api.js
```

### Manual Testing
1. Start both backend and frontend servers
2. Open http://localhost:5173 in your browser
3. Test adding users, claiming points, and viewing the leaderboard
4. Verify real-time updates work correctly

## Project Structure

```
Task-App-3W/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── ClaimHistory.js
│   ├── routes/
│   │   ├── users.js
│   │   └── claims.js
│   ├── app.js
│   ├── seed.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── UserList.tsx
    │   │   ├── ClaimButton.tsx
    │   │   ├── Leaderboard.tsx
    │   │   └── AddUserForm.tsx
    │   ├── api/
    │   │   └── api.ts
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```

## Development

- Backend runs on port 3000
- Frontend runs on port 5173
- CORS is enabled for development

## Bonus Features

- Clean and modern UI with Tailwind CSS
- Responsive design for mobile and desktop
- Real-time updates without page refresh
- Comprehensive error handling
- TypeScript for better development experience 