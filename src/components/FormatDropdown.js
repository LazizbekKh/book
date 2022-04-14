import React from "react";
import { useState } from "react";
import { FilterDrop } from "./FilterDrop";

export const FormatDropdown = ({ title }) => {
  const [opened, setopened] = useState(false);
  const toggler = () => setopened(!opened);
  const closer = () => {
    const wrap = document.querySelector(".wrap");
    wrap.addEventListener("click", () => setopened(false));
  };
  return (
    <div className="filter-wrap button-tag">
      {title && <label className="filter__label">{title}</label>}
      <div className="filter__select blur" onClick={toggler}>
        Все <img src="/img/select-arrow.svg" alt="arrow" />
      </div>
      {opened && <FilterDrop closer={closer} />}
    </div>
  );
};
