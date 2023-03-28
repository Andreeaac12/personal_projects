import "./Carousel.css";
import { useEffect, useState } from "react";

export function Carousel(props) {
  const { children } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);
  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };
  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length);
  }, [children]);

  return (
    <>
      <section className="main-container--sec">
        <div className="carousel-container">
          <h2>THE GOODS</h2>
          <div className="carousel-wrapper">
            <button onClick={prev} className="left-arrow">
              <i class="fa-solid fa-angle-left"></i>
            </button>
            <div className="carousel-content-wrapper">
              <div
                className="carousel-content"
                style={{ transform: `translateX(-${currentIndex * 35}%)` }}
              >
                {children}
              </div>
            </div>
            <button onClick={next} className="right-arrow">
              <i class="fa-solid fa-angle-right"></i>
            </button>
          </div>
          {/* <div className='curve'></div> */}
        </div>
      </section>
    </>
  );
}
