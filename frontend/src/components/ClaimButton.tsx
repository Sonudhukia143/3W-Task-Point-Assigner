import React from 'react';

interface ClaimButtonProps {
  selectedUserId: string;
  onClaim: (userId: string) => void;
  isClaiming: boolean;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({ selectedUserId, onClaim, isClaiming }) => {
  const handleClick = () => {
    if (selectedUserId && !isClaiming) {
      onClaim(selectedUserId);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!selectedUserId || isClaiming}
      className={`px-6 py-3 rounded-md font-medium text-white transition-colors ${
        selectedUserId && !isClaiming
          ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          : 'bg-gray-400 cursor-not-allowed'
      }`}
    >
      {isClaiming ? 'Claiming...' : 'Claim Points'}
    </button>
  );
};

export default ClaimButton; 