import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import '../Styles/Home.css'; // Import the CSS file

const Home = () => {
  const title = 'Welcome to ILL';
  const description = 'This is the Home page';

  return (
    <div className="home-container">
      <h1 className="home-title">{title}</h1>
      <p className="home-description">{description}</p>
      <nav>
        <ul className="home-navigation">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/course">Course</Link></li>
          <li><Link to="/chat">Chat</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/help">Help & Support</Link></li>
          {/* Other navigation links based on your ILL_SiteMap.yaml */}
        </ul>
      </nav>
    </div>
  );
};

export default Home;