import React from 'react';
import { Link } from 'react-router-dom';

export default function AppNavbar() {
  return (
    <nav className="navbar navbar-dark bg-primary mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Phone Directory
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
