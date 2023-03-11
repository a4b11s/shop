import React, { useState } from "react";

import classes from "./Slider.module.css";

interface IProps {
  images: Array<string>;
  slideSize: number;
}

const Slider = ({ images, slideSize }: IProps) => {
  const [currentPos, setCurrentPos] = useState(0);

  const handleSwipeLeft = () => {
    if (currentPos > 0) {
      setCurrentPos(currentPos - 1);
    } else {
      setCurrentPos(images.length - 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentPos < images.length - 1) {
      setCurrentPos(currentPos + 1);
    } else {
      setCurrentPos(0);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.slider}
        style={{ width: slideSize, height: slideSize - slideSize / 4 }}
      >
        <div
          style={{ width: slideSize, height: slideSize - slideSize / 4 }}
          className={classes.holder}
        >
          <ul
            style={{
              transform: `translate3d(-${slideSize * currentPos}px, 0px, 0px)`,
            }}
            className={classes.slides}
          >
            {images.map((img) => {
              return (
                <li
                  key={img}
                  style={{
                    width: slideSize,
                    height: slideSize - slideSize / 4,
                  }}
                  className={classes.slide}
                >
                  <img src={img} alt="slide" />
                </li>
              );
            })}
          </ul>
        </div>
        <nav className={classes.navigation}>
          <button onClick={handleSwipeLeft}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
              <path
                d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"
                data-name="Left"
              />
            </svg>
          </button>
          <button onClick={handleSwipeRight}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
              <path
                d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
                data-name="Right"
              />
            </svg>
          </button>
        </nav>
      </div>
      <ul
        style={{
          width: slideSize,
          justifyContent: images.length > 2 ? "space-between" : "flex-start",
        }}
        className={classes.miniatureNav}
      >
        {images.map((img, index) => {
          return (
            <li
              key={img + "miniature"}
              style={{ width: slideSize / (images.length + 2) }}
              className={
                classes.minSlide +
                " " +
                (index === currentPos ? classes.minSlideActive : "")
              }
              onClick={() => {
                setCurrentPos(index);
              }}
            >
              <img src={img} alt="slide" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Slider;
