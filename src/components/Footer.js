import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Каталог</h3>
            <ul>
              <li><a href="#catalog">Все модели</a></li>
              <li><a href="#catalog">Для пожилых</a></li>
              <li><a href="#catalog">С крышей</a></li>
              <li><a href="#catalog">Грузовые</a></li>
              <li><a href="#catalog">Пассажирские</a></li>
              <li><a href="#catalog">Электротрициклы</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Информация</h3>
            <ul>
              <li><a href="#about">О компании</a></li>
              <li><a href="#services">Этапы работы</a></li>
              <li><a href="#advantages">Наши преимущества</a></li>
              <li><a href="#reviews">Отзывы клиентов</a></li>
              <li><a href="#contacts">Контакты</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Контакты</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <div className="contact-title">Телефон</div>
                  <div className="contact-value">+7 (499) 346-81-66</div>
                  <div className="contact-subtitle">пн-пт 09:00 – 19:00</div>
                  <div className="contact-subtitle">сб-вс 10:00 – 18:00</div>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <div className="contact-title">Email</div>
                  <div className="contact-value">zakaz@eko-bike.ru</div>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <div className="contact-title">Адрес</div>
                  <div className="contact-value">г. Москва, Колодезный переулок 2Ас9</div>
                  <div className="contact-subtitle">Перед приездом обязательно позвоните!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-logo">
            <h4>ЭлектроТрициклы</h4>
            <p>Распродажа электротрициклов</p>
          </div>
          <div className="footer-legal">
            <p>
              Сайт носит исключительно информационный характер и не является публичной офертой. 
              Для получения подробной информации о наличии, видах, характеристиках и стоимости 
              услуг обращайтесь в офис продаж.
            </p>
            <div className="footer-links">
              <a href="#privacy">Политика конфиденциальности</a>
              <span>© 2024 ЭлектроТрициклы</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
