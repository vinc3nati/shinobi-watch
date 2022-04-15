import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export const Account = () => {
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <div className="user">
      <button className="btn icon-btn">
        <FaUserCircle />
        register
      </button>
    </div>
  );
};
