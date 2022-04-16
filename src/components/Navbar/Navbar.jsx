import React from "react";
import { FaMoon } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { Account } from "../Account/Account";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { Searchbar } from "./Searchbar";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="main">
        <div className="logo">
          <img src={logo} alt="logo" className="img img-responsive" />
        </div>
        <Searchbar />
        <ThemeSwitcher />
        <Account />
      </div>
    </nav>
  );
};
