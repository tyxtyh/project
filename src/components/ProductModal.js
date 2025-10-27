import React, { useState } from 'react';
import './ProductModal.css';
import ProductOrderModal from './ProductOrderModal';

const ProductModal = ({ product, isOpen, onClose, onCallbackClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  
  if (!isOpen || !product) return null;

  // Создаем массив изображений для слайдера
  const productImages = product.images || [product.image];

  // Проверяем, является ли изображение путем к файлу или эмодзи
  const isImagePath = (img) => {
    return typeof img === 'string' && (img.startsWith('/') || img.startsWith('http'));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content product-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-body">
          <div className="left-column">
            <div className="product-image-section">
              <div className="product-image-container">
                <div className="product-image">
                  {isImagePath(productImages[currentImageIndex]) ? (
                    <img 
                      src={productImages[currentImageIndex]} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <span 
                    className="product-emoji" 
                    style={{ display: isImagePath(productImages[currentImageIndex]) ? 'none' : 'block' }}
                  >
                    {productImages[currentImageIndex] || "🚴"}
                  </span>
                </div>
                
                {productImages.length > 1 && (
                  <>
                    <button className="slider-btn slider-btn-prev" onClick={prevImage}>
                      ‹
                    </button>
                    <button className="slider-btn slider-btn-next" onClick={nextImage}>
                      ›
                    </button>
                    
                    <div className="slider-indicators">
                      {productImages.map((_, index) => (
                        <button
                          key={index}
                          className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="product-description">
              <h3>Описание:</h3>
              <p>
                {product.description || product.fullDescription || `${product.name} - это современный электротрицикл, который сочетает в себе экологичность, экономичность и удобство использования. Идеально подходит для городских поездок и коротких дистанций.`}
              </p>
            </div>
          </div>
          
          <div className="product-details">
            <h2 className="product-title">{product.name}</h2>
            
            <div className="product-prices">
              <span className="old-price">{product.oldPrice.toLocaleString()} ₽</span>
              <span className="current-price">{product.price.toLocaleString()} ₽</span>
              <span className="discount">
                -{Math.round((1 - product.price / product.oldPrice) * 100)}%
              </span>
            </div>
            
            <div className="product-stock">
              <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? 'В наличии' : 'Нет в наличии'}
              </span>
            </div>
            
            {product.specifications && (
              <div className="product-specifications">
                <h3>Технические характеристики:</h3>
                <div className="specifications-grid">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="specification-item">
                      <span className="spec-key">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="product-actions">
              <button className="btn-order" onClick={() => setIsOrderModalOpen(true)}>Заказать</button>
              <button className="btn-callback" onClick={onCallbackClick}>Обратный звонок</button>
            </div>
          </div>
        </div>
      </div>
      
      <ProductOrderModal 
        product={product}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </div>
  );
};

export default ProductModal;
