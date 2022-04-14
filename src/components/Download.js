import React, { useEffect, useRef, useState } from "react";

export const Download = ({
  icon,
  textButton,
  format,
  formatValue,
  classType,
  setFormatValue,
  download,
  link,
}) => {
  const [opened, setOpened] = useState(false);
  const handleClick = () => setOpened(!opened);
  const chooseCategory = (e) => {
    setFormatValue(e.target.innerText);
    setOpened(false);
  };

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
      {format && (
        <>
          <div className="drop">
            <div className=" button-tag drop-select blur" onClick={handleClick}>
              {formatValue}
              <img src="/img/select-arrow.svg" alt="arrow" />
            </div>
            {opened && (
              <ul className=" drop__ul blur">
                {format &&
                  format.map((item, i) => (
                    <li
                      key={i}
                      className=" drop__li"
                      onClick={(e) => chooseCategory(e)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <button className="button-tag button-tag_green" onClick={download}>
            <img
              className="button-tag__img"
              src="/img/download.svg"
              alt="sale"
            />
            {textButton}
          </button>
        </>
      )}
    </div>
  );
};
