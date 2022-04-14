import React, { useState } from "react";

export const ProgressBar = ({ level, number, lang }) => {
  const [style, setStyle] = useState();

  const getFullPercentage = parseFloat(100 / 6);
  const currentPercentage = getFullPercentage * level;
  const ratherNumber = number - currentPercentage;
  const getPercentage =
    ratherNumber > 0
      ? 100
      : ratherNumber * -1 > getFullPercentage
      ? 0
      : 100 - (ratherNumber * -100) / getFullPercentage;
  const newStyle = {
    width: `${getPercentage}%`,
    background: getPercentage === 100 ? "#33D160" : "#FE8D00",
  };
  setTimeout(() => {
    setStyle(newStyle);
  }, 1000);
  return (
    <div className="level-wrap">
      <div className="level-item">
        <div className="level-item__insider" style={style}></div>
      </div>
      <div className="level__name">
        {level} <span>{lang}</span>
      </div>
    </div>
  );
};
