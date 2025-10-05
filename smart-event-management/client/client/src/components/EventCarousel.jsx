import { useState, useEffect } from "react";

export default function Carousel() {
  const sourcePath = "/assets/";

  const images = [
    "slide1.jpg",
    "slide2.jpg",
    "slide3.jpg",
    "slide4.jpg",
  ];

  const [current, setCurrent] = useState(0);

  // Auto-play loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // change every 3s
    return () => clearInterval(interval);
  }, [images.length]);

  // Navigation
  const nextSlide = () => setCurrent((current + 1) % images.length);
  const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="carousel">
      <button className="prev" onClick={prevSlide}>‹</button>
      <img
        src={sourcePath + images[current]}
        alt={`Slide ${current + 1}`}
        className="carousel-image"
      />
      <button className="next" onClick={nextSlide}>›</button>
    </div>
  );
}
