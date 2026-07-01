// Import the core React library
import React from 'react'
// Import the browser renderer engine from React
import ReactDOM from 'react-dom/client'
// Import our main user interface layout
import App from './App.jsx'
//Import styling for the app
import '../index.css'

// Grab the 'root' div from index.html and render our app inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode helps us find bugs early during development
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)