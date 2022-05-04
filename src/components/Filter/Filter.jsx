import React, { useRef, useState } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { AiFillFilter } from "react-icons/ai";
import { ACTIONS, FILTERS, SORT_BY } from "../../utils/constants";
import { useData } from "../../context";

export const Filter = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const {
    state: {
      filters: { sortBy },
    },
    dispatch,
  } = useData();
  const toggleDropdown = () => setOpen((prev) => !prev);

  useOnClickOutside(dropdownRef, () => setOpen(false));
  return (
    <div ref={dropdownRef} className="filter">
      <AiFillFilter className="filter-icon" onClick={toggleDropdown} />
      {open && (
        <div className="filter-dropdown">
          <p className="text-bold highlight">Sort By</p>
          {Object.values(SORT_BY).map((filter) => (
            <div className="radio-grp" key={filter}>
              <input
                type="radio"
                name="filter-radio"
                id={filter + "-radio"}
                value={filter}
                checked={sortBy === filter ? true : false}
                onChange={() =>
                  dispatch({
                    type: ACTIONS.ChangeFilters,
                    payload: {
                      type: FILTERS.SortBy,
                      value: filter,
                    },
                  })
                }
              />
              <label htmlFor={filter + "-radio"}>
                <span className="radio-btn"></span>
                <span>{filter}</span>
              </label>
            </div>
          ))}
          <p
            className="filter-clear"
            onClick={() => dispatch({ type: ACTIONS.ClearFilters })}
          >
            Clear
          </p>
        </div>
      )}
    </div>
  );
};
