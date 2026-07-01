// Import 'useState' so React can remember the names we type and save
import { useState } from 'react'

function App() {
  // State 1: A string to hold what the user is currently typing into the input box
  const [inputName, setInputName] = useState('')

  // State 2: An array of objects holding our list of names. 
  // Pre-filled with two names so the table isn't blank on load.
  const [userList, setUserList] = useState([
    { id: 1, name: 'Alice Smith' },
    { id: 2, name: 'Bob Jones' }
  ])

  // This function runs automatically when the user submits the form
  const handleSubmit = (event) => {
    // Prevent the browser from refreshing the whole page (the default HTML behavior)
    event.preventDefault()

    // If the input is empty or just spaces, don't do anything
    if (!inputName.trim()) return

    // Create a new user object
    const newUser = {
      id: Date.now(), // Use the current timestamp as a quick, unique ID
      name: inputName // Grab the text from our input state
    }

    // Update our list: take all existing users (...userList) and append the new user
    setUserList([...userList, newUser])

    // Clear the input text box so the user can type a new name
    setInputName('')
  }

  return (
    // Main container for centering our app layout
    <div className="container">
      <h1>User Directory</h1>
      <p>Add names below. Later, this will connect to your backend database!</p>

      {/* --- FORM SECTION --- */}
      {/* When the form is submitted via the button or pressing enter, trigger handleSubmit */}
      <form onSubmit={handleSubmit} className="name-form">
        <input 
          type="text" 
          placeholder="Enter a full name..." 
          // Link this input box directly to our inputName state
          value={inputName} 
          // Every time the user types a letter, update our state immediately
          onChange={(e) => setInputName(e.target.value)} 
        />
        <button type="submit">Add Name</button>
      </form>

      {/* --- TABLE SECTION --- */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID Tag</th>
            <th>Registered Name</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through our userList array and generate a row <tr> for each user */}
          {userList.map((user) => (
            // React requires a unique 'key' for items inside a loop for performance
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Export the component so main.jsx can use it
export default App