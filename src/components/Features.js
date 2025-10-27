import React, { useState, useEffect } from 'react';
import './Features.css';

const Features = ({ onCategoryClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const features = [
    {
      id: "electric-tricycles",
      title: "Электротрициклы",
      price: "от 80 000 руб",
      count: "25 моделей",
      description: "Экологичные и экономичные решения для городских поездок",
      image: "/img/tricikl.png"
    },
    {
      id: "cargo-tricycles",
      title: "Электротрициклы с прицепом",
      price: "от 200 000 руб",
      count: "12 моделей",
      description: "Мощные трициклы для перевозки грузов и коммерческого использования",
      image: "/img/gruzovie.jpg"
    },
    {
      id: "electric-fatbikes",
      title: "Трехколесные электровелосипеды",
      price: "от 90 000 руб",
      count: "15 моделей",
      description: "Универсальные велосипеды с широкими шинами для любого покрытия",
      image: "/img/fatbike.jpg"
    },
    {
      id: "passenger-tricycles",
      title: "Пассажирские трициклы",
      price: "от 180 000 руб",
      count: "10 моделей",
      description: "Комфортные трициклы для перевозки пассажиров",
      image: "/img/passajir.jpg"
    }
  ];

  const getTransformValue = () => {
    // Если осталось меньше 3 элементов, центрируем их
    const remainingElements = features.length - currentIndex;
    if (remainingElements < 3) {
      // Центрируем последние элементы
      const maxTransform = features.length - 3;
      return Math.min(currentIndex, maxTransform) * (100 / 3);
    }
    return currentIndex * (100 / 3);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      // Если дошли до конца, останавливаемся
      if (newIndex >= features.length) {
        return features.length - 1;
      }
      return newIndex;
    });
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      // Если дошли до начала, останавливаемся
      if (newIndex < 0) {
        return 0;
      }
      return newIndex;
    });
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Автоматическая прокрутка каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setCurrentIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          // Если дошли до конца, возвращаемся к началу
          if (newIndex >= features.length) {
            return 0;
          }
          return newIndex;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating, features.length]);

  return (
    <section className="features">
      <div className="container">
        <h2 className="section-title">Мы предлагаем</h2>
        
        <div className="features-slider">
          <button 
            className={`slider-btn slider-btn-prev ${isAnimating ? 'disabled' : ''}`} 
            onClick={prevSlide}
            disabled={isAnimating}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          
          <div className="features-container">
            <div 
              className="features-grid"
              style={{
                transform: `translateX(-${getTransformValue()}%)`
              }}
            >
              {features.map((feature, index) => (
                <div 
                  key={`${feature.id}-${index}`} 
                  className="feature-card"
                >
                  <div className="feature-image">
                    <img src={feature.image} alt={feature.title} />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <div className="feature-price">{feature.price}</div>
                  <div className="feature-count">{feature.count}</div>
                  <p className="feature-description">{feature.description}</p>
                  <button 
                    className="feature-btn"
                    onClick={() => onCategoryClick && onCategoryClick(feature.id)}
                  >
                    Посмотреть модели
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className={`slider-btn slider-btn-next ${isAnimating ? 'disabled' : ''}`} 
            onClick={nextSlide}
            disabled={isAnimating}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;