import React, { useState } from 'react';
import OrderModal from './OrderModal';
import './Header.css';

const Header = ({ onCallbackClick, isMenuOpen, onMenuClose }) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalType, setOrderModalType] = useState('call');

  return (
    <header className="header">
      <div className="container">
        <div className="header-main">
          {/* Левая секция - Логотип */}
          <div className="header-left">
            <div className="logo-section">
              <div className="logo-icon">
                <img 
                  src="/img/logo.png" 
                  alt="Логотип" 
                  onError={(e) => {
                    console.error('Ошибка загрузки логотипа:', e.target.src);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="logo-text">
                <div className="brand-name">
                  <span className="brand-line-2">Электротранспорт</span>
                </div>
                <div className="tagline">Межсезонная распродажа электротраспорта</div>
              </div>
              {/* Мобильные контакты рядом с логотипом */}
              <div className="mobile-contacts">
                <div className="mobile-phone-info">
                  <div className="mobile-phone-number">+7 (499) 346-81-66</div>
                  <div className="mobile-phone-hours">с 8:00 до 20:00</div>
                </div>
                <button 
                  className="mobile-btn-call"
                  onClick={() => {
                    setOrderModalType('call');
                    setIsOrderModalOpen(true);
                  }}
                >
                  <span className="btn-text-full">Заказать звонок</span>
                  <span className="btn-text-short">Звонок</span>
                </button>
              </div>
            </div>
          </div>

          {/* Средняя секция - Кнопка расчета */}
          <div className="header-center">
            <div className="calculation-section">
              <span className="calculation-text">Подберем транспорт под ваши потребности!</span>
              <button className="btn-calculation" onClick={onCallbackClick}>
                Рассчитайте онлайн
              </button>
            </div>
          </div>

          {/* Правая секция - Контакты */}
          <div className="header-right">
            <div className="contact-section">
              <div className="phone-info">
                <div className="phone-icon">
                  <svg viewBox="0 0 24 24" fill="#333">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div className="phone-details">
                  <div className="phone-number">+7 (499) 346-81-66</div>
                  <div className="phone-hours">с 9:00 до 19:00</div>
                </div>
              </div>
              <button 
                className="btn-call"
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
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><a href="#about">О компании</a></li>
            <li className="nav-item-with-badge">
              <a href="#catalog">Каталог</a>
              <span className="models-badge">100+ моделей</span>
            </li>
            <li><a href="#services">Этапы работы</a></li>
            <li><a href="#advantages">Преимущества</a></li>
            <li><a href="#reviews">Отзывы</a></li>
            <li><a href="#contacts">Контакты</a></li>
          </ul>
        </nav>
        
        {/* Мобильное меню */}
        <div 
          className={`mobile-menu ${isMenuOpen ? 'mobile-menu-open' : ''}`}
          onClick={onMenuClose}
        >
          <div 
            className="mobile-menu-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия */}
            <button 
              className="mobile-menu-close"
              onClick={onMenuClose}
            >
              ×
            </button>
            
            <ul className="mobile-nav-list">
              <li><a href="#about" onClick={onMenuClose}>О компании</a></li>
              <li className="mobile-nav-item-with-badge">
                <a href="#catalog" onClick={onMenuClose}>Каталог</a>
                <span className="mobile-models-badge">100+ моделей</span>
              </li>
              <li><a href="#services" onClick={onMenuClose}>Этапы работы</a></li>
              <li><a href="#advantages" onClick={onMenuClose}>Преимущества</a></li>
              <li><a href="#reviews" onClick={onMenuClose}>Отзывы</a></li>
              <li><a href="#contacts" onClick={onMenuClose}>Контакты</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <OrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        type={orderModalType}
      />
    </header>
  );
};

export default Header;
