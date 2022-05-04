import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaVideo, FaThumbsUp, FaUpload, FaHistory } from "react-icons/fa";
import { BsCollectionPlayFill } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
import { useData } from "../../context";

export const Sidebar = () => {
  const { setUploadModal } = useData();
  const toggleActive = ({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link";

  const showUploadModal = () => {
    setUploadModal(true);
  };
  return (
    <ul className="sidebar">
      <NavLink to="/explore" end className={toggleActive}>
        <FaVideo />
        <span>videos</span>
      </NavLink>
      <NavLink to="/explore/playlists" className={toggleActive}>
        <BsCollectionPlayFill />
        <span>Playlists</span>
      </NavLink>
      <NavLink to="/explore/liked" className={toggleActive}>
        <FaThumbsUp />
        <span>Liked</span>
      </NavLink>
      <NavLink to="/explore/watchlater" className={toggleActive}>
        <MdWatchLater />
        <span>watch later</span>
      </NavLink>
      <NavLink to="/explore/history" className={toggleActive}>
        <FaHistory />
        <span>history</span>
      </NavLink>
      <li className="sidebar-link" onClick={showUploadModal}>
        <FaUpload />
        <span>upload</span>
      </li>
    </ul>
  );
};
