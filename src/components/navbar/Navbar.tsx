import React from 'react';
import './Navbar.modules.scss'; 

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Gerico</a>
      </div>
      <div className="navbar-cta">
        <button className="navbar-button">connexion</button>
      </div>
    </nav>
  );
};

export default Navbar;
