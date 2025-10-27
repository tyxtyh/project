import React, { useState } from 'react';
import OrderModal from './OrderModal';
import './Hero.css';

const Hero = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalType, setOrderModalType] = useState('calculate');

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Распродажа электротрициклов</h1>
            <p className="hero-subtitle">
              Скидки до 50% на все модели электротрициклов!
              <br />
              Ограниченное предложение до конца сезона
            </p>
            <div className="hero-advantages">
              <div className="advantage-item">
                <div className="advantage-number">5+</div>
                <div className="advantage-text">лет опыта</div>
              </div>
              <div className="advantage-item">
                <div className="advantage-number">2000+</div>
                <div className="advantage-text">довольных клиентов</div>
              </div>
              <div className="advantage-item">
                <div className="advantage-number">100+</div>
                <div className="advantage-text">моделей в наличии</div>
              </div>
            </div>
            <div className="hero-actions">
              <button 
                className="btn-hero-primary"
                onClick={() => {
                  setOrderModalType('calculate');
                  setIsOrderModalOpen(true);
                }}
              >
                Рассчитать стоимость
              </button>
              <button 
                className="btn-hero-secondary"
                onClick={() => {
                  setOrderModalType('call');
                  setIsOrderModalOpen(true);
                }}
              >
                Заказать звонок
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <OrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        type={orderModalType}
      />
    </section>
  );
};

export default Hero;
