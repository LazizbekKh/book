import React, { Component } from "react";
import Slider from "react-slick";

export const SimpleSlider = (props) => {
  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToScroll: 1,
  };
  return <Slider {...settings}></Slider>;
};
