import React from "react";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-secondary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Music Production
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/daws">
                The Best DAWs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/toasts">
                Toast Demo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/records">
                Record Collection
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
