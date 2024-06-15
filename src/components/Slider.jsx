/* eslint-disable react/prop-types */
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const SliderSlick = ({ settings, children }) => {
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute z-30 left-[1.5rem] top-[50%] w-[40px] h-[40px] bg-black opacity-50 shadow-md rounded-full flex items-center justify-center text-white translate-y-[-50%] hover:cursor-pointer"
        onClick={previous}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
      <div
        className="absolute z-30 right-[1.5rem] top-[50%] w-[40px] h-[40px] bg-black opacity-50 shadow-md rounded-full flex items-center justify-center text-white translate-y-[-50%] hover:cursor-pointer"
        onClick={next}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {children}
      </Slider>
    </div>
  );
};

export default SliderSlick;
