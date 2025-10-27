import React, { useState } from 'react';
import './ProductCardModal.css';

const ProductCardModal = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!isOpen || !product) return null;

  // Создаем массив изображений для слайдера
  const productImages = product.images || [
    product.image,
    "🚗", // Дополнительные изображения для теста
    "🏠",
    "⚡"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="product-modal-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        
        <div className="product-modal-body">
          {/* Левая часть - изображение */}
          <div className="product-image-section">
            <div className="product-image-container">
              <div className="product-image">
                <span className="product-emoji">{productImages[currentImageIndex]}</span>
              </div>
              
              {productImages.length > 1 && (
                <>
                  <button className="image-slider-btn image-slider-prev" onClick={prevImage}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                  </button>
                  <button className="image-slider-btn image-slider-next" onClick={nextImage}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                    </svg>
                  </button>
                  
                  <div className="image-indicators">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        className={`image-indicator ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Правая часть - информация о товаре */}
          <div className="product-info-section">
            <div className="product-header">
              <h2 className="product-title">{product.name}</h2>
              <div className="product-category">{product.category}</div>
            </div>
            
            <div className="product-pricing">
              <div className="price-container">
                <span className="old-price">{product.oldPrice?.toLocaleString()} ₽</span>
                <span className="current-price">{product.price.toLocaleString()} ₽</span>
                {product.oldPrice && (
                  <span className="discount-badge">
                    -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </span>
                )}
              </div>
              
              <div className="stock-info">
                <span className={`stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.inStock ? 'В наличии' : 'Нет в наличии'}
                </span>
              </div>
            </div>
            
            <div className="product-features">
              <h3>Характеристики</h3>
              <ul className="features-list">
                {product.features?.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span className="feature-text">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="product-description">
              <h3>Описание</h3>
              <p>
                {product.name} - это современный электротрицикл, который сочетает в себе 
                экологичность, экономичность и удобство использования. Идеально подходит 
                для городских поездок и коротких дистанций.
              </p>
            </div>
            
            <div className="product-actions">
              <button className="btn-primary">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                </svg>
                Заказать
              </button>
              <button className="btn-secondary">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Рассчитать стоимость
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardModal;
