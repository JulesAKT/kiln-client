import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Projects
      </Link>
      <Link to="/kilns" className="item">
        Kilns
      </Link>

      <div className="right menu">
        <LoginButton />
      </div>
    </div>
  );
};

export default Header;
