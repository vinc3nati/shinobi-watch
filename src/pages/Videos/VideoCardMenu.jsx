import React, { useState, useRef } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { capitalize } from "../../utils/capitalize";

export const VideoCardMenu = ({ menuItems, video }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();
  const toggleMenu = () => setOpenMenu((prev) => !prev);
  useOnClickOutside(menuRef, () => setOpenMenu(false));

  return (
    <div ref={menuRef} className="menu-outer-container">
      <FaEllipsisV className="video-options" onClick={toggleMenu} />
      {openMenu && (
        <ul className="menu-container">
          {menuItems &&
            menuItems.map(({ _id, danger, text, icon, clickHandler }) => (
              <li
                className={`menu-item ${danger && "text-error"}`}
                onClick={(e) => {
                  e.preventDefault();
                  clickHandler(_id, video);
                }}
                key={_id}
              >
                {icon}
                <span>{capitalize(text)}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
