import React, { useEffect, useRef, useState } from "react";

export const SaleButton = ({
  textButton,
  classType,
  setFormatValue,
  purchasing,
}) => {
  const [opened, setOpened] = useState(false);
  // const handleClick = () => setOpened(!opened);
  // const chooseCategory = (e) => {
  //   setFormatValue(e.target.innerText);
  //   setOpened(false);
  // };
  // const arr = [];

  const myRef = useRef();

  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div
      ref={myRef}
      className={`info-book__buttons ${
        !classType ? "col-lg-8 col-md-6 col-sm-12" : "info-book__collect"
      }`}
    >
      {
        <>
          <div className="drop">
            <div className=" button-tag drop-select blur"></div>
          </div>
          <button
            onClick={() => purchasing()}
            className="button-tag button-tag_green button-tag_only"
          >
            <img className="button-tag__img" src="/img/sale.svg" alt="sale" />
            {textButton}
          </button>
        </>
      }
    </div>
  );
};
