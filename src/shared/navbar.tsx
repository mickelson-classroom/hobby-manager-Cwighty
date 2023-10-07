import React from "react";
import { Link } from "react-router-dom";
import {
  faRecordVinyl,
  faBell,
  faMusic,
  faExplosion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Navbar: React.FC = () => {
  const tabs = [
    {
      name: "The Best DAWs",
      path: "/daws",
      icon: faMusic,
    },
    {
      name: "Toast Demo",
      path: "/toasts",
      icon: faBell,
    },
    {
      name: "Record Collection",
      path: "/records",
      icon: faRecordVinyl,
    },
    {
      name: "Wow",
      path: "/wow",
      icon: faExplosion,
    },
  ];

  return (
    <div>
      <nav
        className="navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top bg-secondary"
        role="navigation"
      >
        <div className="container-fluid">
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
              {tabs.map((tab, index) => (
                <li key={index} className="nav-item">
                  <Link className="nav-link" to={tab.path}>
                    <FontAwesomeIcon size="lg" icon={tab.icon} />
                    {" " + tab.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <nav
        className="navbar fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav bg-secondary"
        role="navigation"
      >
        <ul className="navbar-nav w-100">
          <div className=" d-flex flex-row justify-content-around w-100 bg-secondary">
            {tabs.map((tab, index) => (
              <li className="nav-item" key={`tab-${index}`}>
                <Link to={tab.path} className="nav-link">
                  <div className="row d-flex flex-column justify-content-center align-items-center">
                    <FontAwesomeIcon size="lg" icon={tab.icon} />
                    <div>{tab.name}</div>
                  </div>
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </div>
  );
};
