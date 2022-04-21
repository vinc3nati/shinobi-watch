import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Chips = ({ element }) => {
  const { categoryName } = element;
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const searchQuery = query.get("type") ? query.get("type") : "all";

  return (
    <Link
      to={`?type=${encodeURI(categoryName)}`}
      className={`chip ${categoryName === searchQuery ? "chip-active" : ""}`}
    >
      <p className="font-wt-semibold chip-text">{categoryName}</p>
    </Link>
  );
};
