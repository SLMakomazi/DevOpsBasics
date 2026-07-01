import { useState, useEffect } from 'react';

function App() {
  const [inputName, setInputName] = useState('');
  // State starts as an empty array now because data comes from PostgreSQL!
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. FETCH NAMES FROM BACKEND (ON LOAD) ---
  const fetchUsers = async () => {
    try {
      // Points directly to your Express server endpoint
      const response = await fetch('/api/users');
      const data = await response.json();
      setUserList(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users from database:', err);
      setLoading(false);
    }
  };

  // Run the fetch function exactly once when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // --- 2. SEND NEW NAME TO BACKEND ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputName.trim()) return;

    try {
      // Send the data over the network to Express as a JSON payload
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: inputName }),
      });

      if (response.ok) {
        const newUser = await response.json();
        // Optimistically update the UI list instantly using the actual ID from Postgres!
        setUserList([newUser, ...userList]);
        setInputName('');
      }
    } catch (err) {
      console.error('Error saving user to database:', err);
    }
  };

  return (
    <div className="container">
      <h1>User Directory</h1>
      <p>Connected Live to PostgreSQL via Node.js API Server</p>

      {/* --- FORM SECTION --- */}
      <form onSubmit={handleSubmit} className="name-form">
        <input 
          type="text" 
          placeholder="Enter a full name..." 
          value={inputName} 
          onChange={(e) => setInputName(e.target.value)} 
        />
        <button type="submit">Add Name</button>
      </form>

      {/* --- TABLE SECTION --- */}
      {loading ? (
        <p>Loading directory from database...</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID Tag</th>
              <th>Registered Name</th>
            </tr>
          </thead>
          <tbody>
            {userList.length === 0 ? (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center' }}>No users registered yet.</td>
              </tr>
            ) : (
              userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;