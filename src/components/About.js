import React from 'react';
import { FaTrophy, FaWrench, FaPhone } from 'react-icons/fa';
import './About.css';

const About = ({ onCatalogClick }) => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>О компании "ЭлектроТранспорт"</h2>
            <p className="about-description">
              Мы специализируемся на продаже и обслуживании электротрициклов уже более 5 лет. 
              За это время мы помогли более 2000 клиентов найти идеальное решение для своих 
              транспортных потребностей.
            </p>
            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">5+</div>
                <div className="stat-text">лет опыта</div>
              </div>
              <div className="stat">
                <div className="stat-number">2000+</div>
                <div className="stat-text">довольных клиентов</div>
              </div>
              <div className="stat">
                <div className="stat-number">100+</div>
                <div className="stat-text">моделей в наличии</div>
              </div>
            </div>
            <div className="about-features">
              <div className="feature">
                <span className="feature-icon">
                  <FaTrophy style={{ color: '#000', fontSize: '48px' }} />
                </span>
                <div>
                  <h4>Сертифицированные товары</h4>
                  <p>Все наши электротрициклы имеют сертификаты качества и соответствуют российским стандартам</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">
                  <FaWrench style={{ color: '#000', fontSize: '48px' }} />
                </span>
                <div>
                  <h4>Собственный сервис</h4>
                  <p>У нас есть собственный сервисный центр с квалифицированными мастерами</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">
                  <FaPhone style={{ color: '#000', fontSize: '48px' }} />
                </span>
                <div>
                  <h4>Круглосуточная поддержка</h4>
                  <p>Наша служба поддержки работает 24/7 для решения любых вопросов</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img 
              src="/img/about_company.jpg" 
              alt="" 
              className="about-main-image"
            />
            <div className="about-cta">
              <button className="cta-button" onClick={onCatalogClick}>
                <svg className="cta-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Получить персональное предложение
              </button>
              <p className="cta-description">
                Оставьте заявку и получите индивидуальный расчет стоимости с учетом ваших потребностей
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
