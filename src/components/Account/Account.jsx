import React, { useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { capitalize } from "../../utils/capitalize";

export const Account = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const {
    user: { user, token },
    handleLogOut,
  } = useAuth();
  const location = useLocation();
  const from = location.pathname;

  const toggleDropdown = () => setOpen((prev) => !prev);
  useOnClickOutside(dropdownRef, () => setOpen(false));
  return (
    <div ref={dropdownRef} className="user">
      {!token && (
        <Link to="/signup" state={{ from }}>
          <button className="btn icon-btn">
            <FaUserCircle />
            register
          </button>
        </Link>
      )}
      {token && (
        <>
          <div className="account-name" onClick={toggleDropdown}>
            <span className="text-bold">
              {capitalize(user.name.split(" ")[0])}
            </span>
            <IoIosArrowDown />
          </div>
          {open && (
            <div className="account-dropdown text-center">
              <ul className="list">
                <li onClick={() => navigate("/profile")}>Account</li>
                <li onClick={handleLogOut}>Sign Out</li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};
