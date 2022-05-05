import React, { useState, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

export const MultipleSelect = ({
  label,
  options,
  onChange,
  selectedItem,
  onFocus,
  ...rest
}) => {
  const [showList, setShowList] = useState(false);
  const listRef = useRef();

  const toggle = () => setShowList((prev) => !prev);

  useOnClickOutside(listRef, () => setShowList(false));

  return (
    <div className="multiple-select-grp" ref={listRef}>
      {selectedItem && (
        <div className="selected-items-container">
          {selectedItem.map(({ _id, categoryName }) => (
            <p className="selected-item" key={_id}>
              {categoryName}
            </p>
          ))}
        </div>
      )}
      <output
        className="multiple-select-field"
        onClick={(e) => {
          onFocus(e);
          toggle();
        }}
        name={label.toLowerCase()}
      >
        {label}
        <IoIosArrowDown />
      </output>

      {showList && (
        <div className="multiple-select-list">
          {options?.map((item) => (
            <div className="checkbox-grp" key={item._id}>
              <input
                type="checkbox"
                checked={selectedItem.find((el) => el._id === item._id)}
                onChange={(e) => onChange(e, item)}
                id={`${item.categoryName}-check`}
              />
              <label htmlFor={`${item.categoryName}-check`}>
                {item.categoryName}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
