import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import UserList from './components/UserList';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import AddUserForm from './components/AddUserForm';
import ClaimHistory from './components/ClaimHistory';
import { getUsers, addUser, claimPoints } from './api/api';
import type { User } from './api/api';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isClaiming, setIsClaiming] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [lastClaimedPoints, setLastClaimedPoints] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [_socket, setSocket] = useState<Socket | null>(null);

  console.log(users);
  console.log(selectedUserId);
  console.log(isClaiming);
  console.log(isAdding);
  console.log(lastClaimedPoints);
  console.log(activeTab);

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io('https://threew-task-point-assigner.onrender.com');
    setSocket(newSocket);

    newSocket.on('usersUpdated', (updatedUsers: User[]) => {  
      setUsers(updatedUsers);
    });

    newSocket.on('pointClaimed', (data) => {
      setLastClaimedPoints(data.claimedPoints);
      setTimeout(() => setLastClaimedPoints(null), 3000);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    setLastClaimedPoints(null);
  };

  const handleClaim = async (userId: string) => {
    setIsClaiming(true);
    try {
      const result = await claimPoints(userId);
      setLastClaimedPoints(result.claimedPoints);
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === userId 
            ? { ...user, totalPoints: result.user.totalPoints }
            : user
        )
      );
    } catch (error) {
      console.error('Failed to claim points:', error);
    } finally {
      setIsClaiming(false);
    }
  };

  const handleAddUser = async (name: string) => {
    setIsAdding(true);
    try {
      const newUser = await addUser(name);
      setUsers(prevUsers => [...prevUsers, newUser]);
    } catch (error) {
      console.error('Failed to add user:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-8">
      {/* Header and Tabs */}
      <header className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-2 md:mb-0">Leaderboard</h1>
          <nav className="flex space-x-6 border-b border-gray-200 pb-1">
            <button 
              className={`text-lg font-medium pb-2 transition-colors ${activeTab === 'leaderboard' ? 'border-b-4 border-yellow-400 text-yellow-700' : 'text-gray-500 hover:text-yellow-600'}`}
              onClick={() => setActiveTab('leaderboard')}
            >
              Live Ranking
            </button>
          </nav>
        </div>
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="text-sm text-gray-600">Settlement time <span className="font-semibold text-yellow-700">2 days 01:45:41</span></div>
          <div className="flex items-center gap-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-full font-semibold flex items-center gap-2 shadow">
              <span>🎁</span> Rewards
            </button>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">Star tasks</span>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {activeTab === 'leaderboard' && (
          <>
            {/* Leaderboard */}
            <section className="md:col-span-2">
              <Leaderboard users={users} />
            </section>
            {/* Sidebar: User actions */}
            <aside className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Claim Points</h2>
                <UserList 
                  users={users} 
                  selectedUserId={selectedUserId} 
                  onUserSelect={handleUserSelect} 
                />
                <ClaimButton 
                  selectedUserId={selectedUserId} 
                  onClaim={handleClaim} 
                  isClaiming={isClaiming} 
                />
                {lastClaimedPoints && (
                  <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded-md animate-pulse">
                    <p className="text-green-800 font-medium text-center">
                      🎉 Successfully claimed {lastClaimedPoints} points!
                    </p>
                  </div>
                )}
              </div>
              <AddUserForm onAddUser={handleAddUser} isAdding={isAdding} />
              <ClaimHistory />
            </aside>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
