import React, { useRef, useState } from "react";
import { useData } from "../../context/index";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Chips } from "./Chips";

export const ChipContainer = () => {
  const {
    state: { categories },
  } = useData();
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  return (
    <div className="chips-outer-container">
      {scrollX !== 0 && (
        <button className="btn prev-btn" onClick={() => slide(-50)}>
          <IoIosArrowBack />
        </button>
      )}
      <div className="chips-container" ref={scrl} onScroll={scrollCheck}>
        <Chips element={{ categoryName: "all" }} />
        {categories.map((el) => (
          <Chips element={el} key={el._id} />
        ))}
      </div>
      {!scrolEnd && (
        <button className="btn next-btn" onClick={() => slide(50)}>
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
};
