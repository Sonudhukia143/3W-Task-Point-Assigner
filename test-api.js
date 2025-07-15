const API_BASE = 'http://localhost:3000/api';

async function testAPI() {
  console.log('🧪 Testing Leaderboard API...\n');

  try {
    // Test 1: Get all users
    console.log('1. Testing GET /api/users...');
    const usersResponse = await fetch(`${API_BASE}/users`);
    const users = await usersResponse.json();
    console.log(`✅ Found ${users.length} users`);
    console.log('Users:', users.map(u => `${u.name} (${u.totalPoints} points)`).join(', '));

    // Test 2: Add a new user
    console.log('\n2. Testing POST /api/users...');
    const addUserResponse = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'TestUser' })
    });
    const newUser = await addUserResponse.json();
    console.log(`✅ Added user: ${newUser.name} (${newUser.totalPoints} points)`);

    // Test 3: Claim points for the new user
    console.log('\n3. Testing POST /api/users/:userId/claim...');
    const claimResponse = await fetch(`${API_BASE}/users/${newUser._id}/claim`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const claimResult = await claimResponse.json();
    console.log(`✅ Claimed ${claimResult.claimedPoints} points for ${claimResult.user.name}`);

    // Test 4: Get claim history
    console.log('\n4. Testing GET /api/claims/history...');
    const historyResponse = await fetch(`${API_BASE}/claims/history`);
    const history = await historyResponse.json();
    console.log(`✅ Found ${history.length} claim records`);

    // Test 5: Get updated users list
    console.log('\n5. Testing updated users list...');
    const updatedUsersResponse = await fetch(`${API_BASE}/users`);
    const updatedUsers = await updatedUsersResponse.json();
    const testUser = updatedUsers.find(u => u.name === 'TestUser');
    console.log(`✅ TestUser now has ${testUser.totalPoints} points`);

    console.log('\n🎉 All API tests passed!');
    console.log('\n📊 Current Leaderboard:');
    updatedUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} - ${user.totalPoints} points`);
    });

  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

// Run the test
testAPI(); 