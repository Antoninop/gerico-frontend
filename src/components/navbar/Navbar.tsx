import React from 'react';
import './Navbar.modules.scss'; 

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Gerico</a>
      </div>

    </nav>
  );
};

export default Navbar;
