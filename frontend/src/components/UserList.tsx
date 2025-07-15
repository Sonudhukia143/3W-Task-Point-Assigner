import React from 'react';

interface User {
  _id: string;
  name: string;
  totalPoints: number;
}

interface UserListProps {
  users: User[];
  selectedUserId: string;
  onUserSelect: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, selectedUserId, onUserSelect }) => {
  return (
    <div className="mb-6">
      <label htmlFor="user-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select User
      </label>
      <select
        id="user-select"
        value={selectedUserId}
        onChange={(e) => onUserSelect(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Choose a user...</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name} ({user.totalPoints} points)
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserList; 