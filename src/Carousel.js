import React, { useState, useEffect } from 'react';
import './Carousel.css';
import image1 from './asset/CarouselImages/1.jpg'
import image2 from './asset/CarouselImages/2.jpg'
import image3 from './asset/CarouselImages/3.jpg'
import image4 from './asset/CarouselImages/4.jpg'
import image5 from './asset/CarouselImages/5.jpg'
import leftArrow from './asset/arrow_left.png'
import rightArrow from './asset/arrow_right.png'
import dot from './asset/dot.png'
import bar from './asset/bar.png'

const ImageCarousel = () => {
  const images = [
    { src: image1, alt: 'Image 1' },
    { src: image2, alt: 'Image 2' },
    { src: image3, alt: 'Image 3' },
    { src: image4, alt: 'Image 4' },
    { src: image5, alt: 'Image 5' },
  ];

  const [carouselState, setCarouselState] = useState(3);
  const [isHidden, setIsHidden] = useState(false);

  const hideDesc = () => {
    setIsHidden(true);
    setTimeout(() => {
      setIsHidden(false);
    }, 1000);
  };

  const imageFunc = (state) => {
    setCarouselState(state);
    hideDesc();
  };

  const goLeft = () => {
    setCarouselState((prev) => (prev === 1 ? 5 : prev - 1));
    hideDesc();
  };

  const goRight = () => {
    setCarouselState((prev) => (prev % 5) + 1);
    hideDesc();
  };

  // useEffect(() => {
  //   const intervalId = setInterval(goRight, 3500);
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <div className='container'>
      <div className={`carousel state-${carouselState}`}>
        {images.map((image, index) => (
          <img key={index} src={image.src} alt={image.alt} onClick={() => imageFunc(index + 1)} />
        ))}
        {!isHidden && <div className='desc'> {images[carouselState - 1].description} </div>}
      </div>
      <div className='nav'>
        <img src={leftArrow} alt='Left' onClick={goLeft}></img>
        {Array.from({ length: 5 }).map((_, index) => (
          <img
            key={index}
            src={index === carouselState - 1 ? bar : dot}
            alt='State'
            onClick={() => imageFunc(index + 1)}
          />
        ))}
        <img src={rightArrow} alt='Right' onClick={goRight}></img>
      </div>
    </div>
  );
};

export default ImageCarousel;
