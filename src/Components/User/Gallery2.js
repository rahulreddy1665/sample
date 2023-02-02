import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Gallery2(props) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [PROFILE] = useState(process.env.REACT_APP_PROFILE_URL);
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,

    fade: true,
    arrows: true,
    asNavFor: ".slider-nav",
  };

  const settingsThumbs = {
    slidesToShow: 2,
    arrows: false,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: false,
    centerMode: true,
    infinite: false,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: "10px",
  };

  return (
    <div className="App">
      <div className="slider-wrapper">
        <Slider
          {...settingsMain}
          asNavFor={nav2}
          ref={(slider) => setSlider1(slider)}
        >
          {props.slidesData.map((slide) => (
            <div className="slick-slide" key={slide}>
              <h2 className="slick-slide-title">{slide.title}</h2>
              <img
                className="slick-slide-image"
                src={PROFILE + slide}
                width="100%"
              />
              <label className="slick-slide-label">{slide.label}</label>
            </div>
          ))}
        </Slider>
        <div className="thumbnail-slider-wrap">
          <Slider
            {...settingsThumbs}
            asNavFor={nav1}
            ref={(slider) => setSlider2(slider)}
          >
            {props.slidesData.map((slide) => (
              <div className="slick-slide" key={slide}>
                <img
                  width="50%"
                  className="slick-slide-image"
                  src={PROFILE + slide}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
