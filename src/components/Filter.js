import React, { useContext, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import language from "../constants/language";
import { Context } from "../context/MainContext";

export const Filter = ({
  title,
  data,
  value,
  method,
  date,
  startDate,
  setStartDate,
  setDateChosen,
  dateChosen,
}) => {
  const { currentLang } = useContext(Context);
  const [opened, setOpened] = useState(false);
  const handleClick = () => setOpened(!opened);
  const chooseCategory = (id) => {
    method(id);
    setOpened(false);
  };
  const myRef = useRef();

  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setOpened(false);
    }
  };
  const getYear = date ? startDate.getFullYear() : null;
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-12 filter-wrap" ref={myRef}>
        <label className="filter__label">
          {title}
          {date && dateChosen && (
            <div className="filter-date" onClick={() => setDateChosen(false)}>
              <img src="/img/reset.png" />
            </div>
          )}
        </label>
        {date ? (
          <DatePicker
            value={`${dateChosen ? getYear : language[currentLang].all}`}
            onChange={(date) => {
              setStartDate(date);
              setDateChosen(true);
            }}
            maxDate={new Date()}
            showYearPicker
            dateFormat="yyyy-mm-dd"
            className="filter__select blur"
            renderCustomHeader={({ date, decreaseYear, increaseYear }) => {
              const getYear = new Date(startDate).getFullYear();
              return (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div className="date-nav">
                    <button className="date-nav__button" onClick={decreaseYear}>
                      {"<"}
                    </button>
                    <div>{getYear}</div>
                    <button className="date-nav__button" onClick={increaseYear}>
                      {">"}
                    </button>
                  </div>
                </div>
              );
            }}
          />
        ) : (
          <div className="filter__select blur" onClick={handleClick}>
            {value ?? ""}
            <img src="/img/select-arrow.svg" alt="arrow" />
          </div>
        )}
        {opened && (
          <ul className="filter__dropdown blur">
            <li
              className="filter__dropdown-li"
              onClick={() => chooseCategory(0)}
            >
              {language[currentLang].all}
            </li>
            {data &&
              data.map((item) => (
                <li
                  key={item.id}
                  className="filter__dropdown-li"
                  onClick={() => chooseCategory(item.id)}
                >
                  {currentLang === 0
                    ? item.name_ru
                    : currentLang === 1
                    ? item.name_uz
                    : item.name_en}
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
};
