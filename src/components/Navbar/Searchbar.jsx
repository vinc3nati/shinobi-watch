import React from "react";
import { FaSearch } from "react-icons/fa";

export const Searchbar = () => {
  return (
    <div className="search-bar">
      <button type="submit" className="btn tertiary">
        <FaSearch />
      </button>
      <div className="input-grp">
        <input type="search" placeholder="Search Videos" />
      </div>
    </div>
  );
};
