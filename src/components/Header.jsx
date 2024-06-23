import React from 'react';
import '../styles/Header.css';
import viteLogo from '/vite.svg';  

function Header() {
  return (
    <div className="header">
      <div className="left-menu">
        <img src={viteLogo} className="menu-icon" alt="Gmail logo" />
      </div>
      <div className="search">
        <input type="text" className="search-bar" placeholder="Search email" />
      </div>
    </div>
  );
}

export default Header;
