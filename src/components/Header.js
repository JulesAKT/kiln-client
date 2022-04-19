import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/projects" className="item">
        Projects
      </Link>
      <Link to="/kilns" className="item">
        Kilns
      </Link>
      <Link to="/inventory" className="item">
        Inventory
      </Link>

      <div className="right menu">
        <LoginButton />
      </div>
    </div>
  );
};

export default Header;
