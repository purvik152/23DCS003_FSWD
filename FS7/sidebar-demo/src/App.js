import React, { useState } from 'react';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-container">
      {/* Hamburger Menu */}
      <button className="hamburger" onClick={handleSidebarToggle}>
        <span className="hamburger-icon">&#9776;</span>
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li><button onClick={handleNavClick}>Home</button></li>
            <li><button onClick={handleNavClick}>About</button></li>
            <li><button onClick={handleNavClick}>Contact</button></li>
          </ul>
        </nav>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="overlay" onClick={handleSidebarToggle}></div>}

      {/* Main Content */}
      <main className="main-content">
        <h1>Welcome to My Website</h1>
        <p>This is the main content of the webpage.</p>
      </main>
    </div>
  );
}

export default App;
