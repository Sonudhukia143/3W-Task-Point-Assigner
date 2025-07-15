const API_BASE_URL = 'http://localhost:3000/api';

export interface User {
  _id: string;
  name: string;
  totalPoints: number;
}

export interface ClaimHistory {
  _id: string;
  userId: string;
  userName: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}

// Get all users
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

// Add new user
export const addUser = async (name: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error('Failed to add user');
  }
  return response.json();
};

// Claim points for user
export const claimPoints = async (userId: string): Promise<{ user: User; claimedPoints: number }> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/claim`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to claim points');
  }
  return response.json();
};

// Get claim history
export const getClaimHistory = async (): Promise<ClaimHistory[]> => {
  const response = await fetch(`${API_BASE_URL}/claims/history`);
  if (!response.ok) {
    throw new Error('Failed to fetch claim history');
  }
  return response.json();
}; 