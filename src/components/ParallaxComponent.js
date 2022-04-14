import React, { useRef, useEffect } from "react";
import Parallax from "parallax-js";

export const ParallaxComponent = (props) => {
  const scene1 = useRef();
  const scene2 = useRef();
  useEffect(() => {
    const parallax1 = new Parallax(scene1.current, {
      calibrateX: true,
      calibrateY: true,
    });
    const parallax2 = new Parallax(scene2.current, {
      calibrateX: true,
      calibrateY: true,
    });
    return () => {
      parallax1.disable();
      parallax2.disable();
    };
  }, []);
  return (
    <div className="parallax">
      <div className={`parallax-wrapper ${props.type}`}>
        <div ref={scene1} className="parallax-book">
          <img
            src="/img/book1.svg"
            data-depth="1"
            alt="book1"
            className="parallax-book__img"
          />
          <img
            src="/img/book2.svg"
            data-depth="0.7"
            alt="book2"
            className="parallax-book__img"
          />
          <img
            src="/img/book3.svg"
            data-depth="0.5"
            alt="book3"
            className="parallax-book__img"
          />
          <img
            src="/img/book4.svg"
            data-depth="0.6"
            alt="book4"
            className="parallax-book__img"
          />
          <img
            src="/img/book5.svg"
            data-depth="0.8"
            alt="book5"
            className="parallax-book__img"
          />
          <img
            src="/img/book6.svg"
            data-depth="0.4"
            alt="book6"
            className="parallax-book__img"
          />
          <img
            src="/img/book7.svg"
            data-depth="0.6"
            alt="book7"
            className="parallax-book__img"
          />
        </div>
        <div ref={scene2} className="parallax-book">
          <div
            data-depth="0.9"
            className="parallax-circle parallax-circle__red"
          ></div>
          <div
            data-depth="0.6"
            className="parallax-circle parallax-circle__big"
          ></div>
        </div>
      </div>
    </div>
  );
};
