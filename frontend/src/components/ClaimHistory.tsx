import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { getClaimHistory } from '../api/api';
import type { ClaimHistory as ClaimHistoryType } from '../api/api';

const SOCKET_URL = 'https://threew-task-point-assigner.onrender.com';

const ClaimHistory: React.FC = () => {
  const [history, setHistory] = useState<ClaimHistoryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
    // Set up Socket.IO for real-time updates
    const socket: Socket = io(SOCKET_URL);
    socket.on('pointClaimed', (data) => {
      if (data.claimHistory) {
        setHistory((prev) => [data.claimHistory, ...prev].slice(0, 10));
        console.log('pointClaimed', history);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getClaimHistory();
      setHistory(data);
    } catch (error) {
      console.error('Failed to load claim history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Claims</h3>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Claims</h3>
      {history.length === 0 ? (
        <p className="text-gray-500">No claims yet</p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {history.slice(0, 10).map((claim) => (
            <div key={claim._id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <span className="font-medium text-gray-900">{claim.userName}</span>
                <span className="text-gray-500 text-sm ml-2">
                  claimed {claim.points} points
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {claim.createdAt ? new Date(claim.createdAt).toLocaleString() : ''}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClaimHistory; 