import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Account } from "../Account/Account";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { Searchbar } from "./Searchbar";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="main">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" className="img img-responsive" />
          </Link>
        </div>
        <Searchbar />
        <ThemeSwitcher />
        <Account />
      </div>
    </nav>
  );
};
