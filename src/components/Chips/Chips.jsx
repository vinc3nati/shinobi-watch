import React, { useState, useEffect } from "react";
import { ACTIONS, FILTERS } from "../../utils/constants";
import { useData } from "../../context/index";

export const Chips = ({ element }) => {
  const { categoryName } = element;
  const {
    state: { filters },
    dispatch,
  } = useData();
  const [active, setActive] = useState(false);
  useEffect(() => {
    filters.category === categoryName ? setActive(true) : setActive(false);
    filters.category === "" && categoryName === "all" && setActive(true);
  }, [filters.category, categoryName]);

  return (
    <div
      className={`chip ${active && "chip-active"}`}
      onClick={() => {
        if (!active)
          dispatch({
            type: ACTIONS.ChangeFilters,
            payload: {
              type: FILTERS.Category,
              value: categoryName,
            },
          });
        else
          dispatch({
            type: ACTIONS.ClearFilters,
          });
      }}
    >
      <p className="font-wt-semibold chip-text">{categoryName}</p>
    </div>
  );
};
