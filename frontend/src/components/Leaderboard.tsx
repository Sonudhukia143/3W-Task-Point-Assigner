import React from 'react';

interface User {
  _id: string;
  name: string;
  totalPoints: number;
}

interface LeaderboardProps {
  users: User[];
}

const medalColors = [
  'from-yellow-300 to-yellow-500 border-yellow-400', // Gold
  'from-gray-300 to-gray-400 border-gray-400',      // Silver
  'from-orange-300 to-orange-500 border-orange-400'  // Bronze
];

const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);
  const top3 = sortedUsers.slice(0, 3);
  const rest = sortedUsers.slice(3);

  return (
    <div className="mb-8">
      {/* Top 3 Cards */}
      <div className="flex justify-center items-end space-x-2 mb-6">
        {top3.map((user, idx) => (
          <div
            key={user._id}
            className={`flex flex-col items-center bg-gradient-to-b ${medalColors[idx]} border-2 rounded-xl shadow-lg px-4 py-3 ${idx === 1 ? 'scale-110 z-10' : 'scale-95'} transition-transform`}
            style={{ minWidth: 90 }}
          >
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-2 border-4 border-white shadow">
              {/* Placeholder for avatar/icon */}
              <span className="text-3xl">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}</span>
            </div>
            <div className="font-bold text-lg text-gray-800 truncate max-w-[80px] text-center">{user.name}</div>
            <div className="text-xs text-gray-600">{user.totalPoints} pts</div>
            <div className="mt-1 text-xs font-semibold text-yellow-700">#{idx + 1}</div>
          </div>
        ))}
      </div>
      {/* Rest of Leaderboard */}
      <div className="bg-white rounded-lg shadow divide-y divide-gray-100">
        {rest.map((user, idx) => (
          <div key={user._id} className="flex items-center px-4 py-3">
            <div className="w-8 text-center font-bold text-gray-500">{idx + 4}</div>
            <div className="flex-1 font-medium text-gray-800 truncate">{user.name}</div>
            <div className="text-sm text-gray-600 font-semibold">{user.totalPoints} pts</div>
          </div>
        ))}
        {rest.length === 0 && (
          <div className="text-center text-gray-400 py-4">No more users</div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard; 