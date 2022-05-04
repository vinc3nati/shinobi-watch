import React, { useState, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/data-context";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { Filter } from "../Filter/Filter";

export const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const searchBarRef = useRef();
  const navigate = useNavigate();
  const {
    state: { categories, videos },
  } = useData();
  const searchKeyWords = categories.reduce(
    (acc, curr) => acc.concat(curr.categoryName),
    []
  );
  videos.forEach((item) => searchKeyWords.push(item.title));

  useOnClickOutside(searchBarRef, () => setActiveSearch(false));

  const searchSubmit = () => {
    if (searchQuery != "") {
      navigate(`/search?searchQuery=${encodeURIComponent(searchQuery)}`);
      setActiveSearch(false);
      setSearchQuery("");
    }
  };

  const searchedOptions = searchKeyWords
    .map((item) => {
      if (item.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1) {
        return (
          <li
            className="search-item"
            key={item}
            onClick={() => {
              navigate(`/search?searchQuery=${encodeURIComponent(item)}`);
              setActiveSearch(false);
              setSearchQuery("");
            }}
          >
            {item}
          </li>
        );
      }
    })
    .filter((item) => item !== undefined);

  return (
    <div className="search-bar">
      <button type="submit" className="btn tertiary">
        <FaSearch />
      </button>
      <div className="input-grp">
        <input
          type="text"
          onFocus={() => setActiveSearch(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              searchSubmit();
            }
          }}
          placeholder="Search Videos"
        />
      </div>
      {searchQuery !== "" && (
        <button className="btn tertiary" onClick={() => setSearchQuery("")}>
          <FaTimes />
        </button>
      )}
      <Filter />
      {searchQuery !== "" && (
        <ul
          style={{ display: activeSearch ? "block" : "none" }}
          className="search-list"
        >
          {searchedOptions.length !== 0 ? (
            searchedOptions
          ) : (
            <li className="search-item">No results found for: {searchQuery}</li>
          )}
        </ul>
      )}
    </div>
  );
};
