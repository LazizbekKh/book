import React, { useContext, useEffect } from "react";
import language from "../constants/language";
import { Context } from "../context/MainContext";

export default function Policy() {
  const { currentLang } = useContext(Context);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="policy container">
      <div className="title policy-title">{language[currentLang].offerta}</div>
    </div>
  );
}
