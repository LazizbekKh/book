import React, { useEffect } from "react";

export default function Policy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="policy container"></div>;
}
