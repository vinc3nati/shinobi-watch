import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export const ScrollTop = () => {
  const [showButton, setShowButton] = useState(false);

  const toggleShow = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setShowButton(true);
    } else if (scrolled <= 300) {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleShow);

  return (
    <>
      {showButton && (
        <button
          title="Top"
          className="btn primary scroll-btn"
          onClick={scrollToTop}
        >
          <IoIosArrowUp />
        </button>
      )}
    </>
  );
};
