import React, { useState } from 'react';

interface AddUserFormProps {
  onAddUser: (name: string) => void;
  isAdding: boolean;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser, isAdding }) => {
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() && !isAdding) {
      onAddUser(userName.trim());
      setUserName('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Add New User</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="user-name" className="block text-sm font-medium text-gray-700 mb-1">
            User Name
          </label>
          <input
            type="text"
            id="user-name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isAdding}
          />
        </div>
        <button
          type="submit"
          disabled={!userName.trim() || isAdding}
          className={`px-4 py-2 rounded-md font-medium text-white transition-colors ${
            userName.trim() && !isAdding
              ? 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isAdding ? 'Adding...' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default AddUserForm; 