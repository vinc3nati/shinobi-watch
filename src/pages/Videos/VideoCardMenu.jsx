import React, { useState, useRef } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { capitalize } from "../../utils/capitalize";
import { SHARE_CONTENT, SHARE_URL } from "../../utils/constants";

export const VideoCardMenu = ({ menuItems, video }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();
  const toggleMenu = () => setOpenMenu((prev) => !prev);
  useOnClickOutside(menuRef, () => setOpenMenu(false));
  const encodedVideoId = encodeURIComponent(video?._id);

  const shareURL = `${SHARE_URL}/?content=${SHARE_CONTENT} https://shinobi-watch.netlify.app/explore/${encodedVideoId}`;

  return (
    <div ref={menuRef} className="menu-outer-container">
      <FaEllipsisV className="video-options" onClick={toggleMenu} />
      {openMenu && (
        <ul className="menu-container">
          {menuItems &&
            menuItems.map(({ _id, danger, text, icon, clickHandler }) => {
              return text === "Share" ? (
                <a
                  style={{ textDecoration: "none" }}
                  className="menu-item"
                  href={shareURL}
                  target="_blank"
                  key={_id}
                >
                  {icon}
                  <span>{text}</span>
                </a>
              ) : (
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
              );
            })}
        </ul>
      )}
    </div>
  );
};
