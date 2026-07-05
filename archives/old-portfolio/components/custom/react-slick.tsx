"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

const REACT_SLICK_SETTINGS = (optionalSettings: any) => {
  const defaultSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const settings = { ...defaultSettings, ...optionalSettings };
  return settings;
};

function ReactSlick({
  children,
  optionalSettings,
}: Readonly<{
  children: React.ReactNode;
  optionalSettings?: any;
}>) {
  const settings = REACT_SLICK_SETTINGS(optionalSettings);
  return (
    <Slider {...settings} className="slider-container">
      {children}
    </Slider>
  );
}

export default ReactSlick;
