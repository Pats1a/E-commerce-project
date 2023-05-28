import React, { useState } from "react";
import carouselImg1 from "./carousel images/carousel-image-1.png"
import carouselImg2 from "./carousel images/carousel-image-2.png"
import carouselImg3 from "./carousel images/carousel-image-3.png"
import carouselImg4 from "./carousel images/carousel-image-4.png"
import carouselImg5 from "./carousel images/carousel-image-5.png"
import carouselImg6 from "./carousel images/carousel-image-6.png"
import carouselImg7 from "./carousel images/carousel-image-7.png"
import "./App.css";

const images: string[] = [
    carouselImg1,
    carouselImg2,
    carouselImg3,
    carouselImg4,
    carouselImg5,
    carouselImg6,
    carouselImg7,
  ];
  
  const Carousel: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  
    const previousImage = (): void => {
      const newIndex: number =
        currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
    };
  
    const nextImage = (): void => {
      const newIndex: number = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(newIndex);
    };
  
    const goToImage = (index: number): void => {
      setCurrentImageIndex(index);
    };
  
    return (
      <div className="carousel-container">
        <div className="carousel-images">
          {images.map((image: string, index: number) => (
            <div
              key={index}
              className={`carousel-image ${
                index === currentImageIndex ? "active" : ""
              }`}
            >
              <img src={image} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="carousel-navigation">
          <button className="carousel-arrow left-arrow" onClick={previousImage}>
            &lt;
          </button>
          <div className="carousel-dots">
          {images.map((image: string, index: number) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentImageIndex ? "active" : ""}`}
              onClick={() => goToImage(index)}></button>
          ))}
          </div>
          <button className="carousel-arrow right-arrow" onClick={nextImage}>
            &gt;
          </button>
        </div>
      </div>
    );
  };
  
  export default Carousel;