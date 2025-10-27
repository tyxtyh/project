import React from 'react';
import { FaBolt, FaWrench, FaShieldAlt, FaTruck, FaCreditCard, FaExchangeAlt } from 'react-icons/fa';
import './Advantages.css';

const Advantages = () => {
  const advantages = [
    {
      icon: <FaBolt style={{ color: '#000', fontSize: '64px' }} />,
      title: "Быстрая доставка",
      description: "Доставляем электротрициклы по всей России за 3-7 дней"
    },
    {
      icon: <FaWrench style={{ color: '#000', fontSize: '64px' }} />,
      title: "Сборка и настройка",
      description: "Бесплатная сборка и настройка всех моделей"
    },
    {
      icon: <FaShieldAlt style={{ color: '#000', fontSize: '64px' }} />,
      title: "Гарантия 2 года",
      description: "Официальная гарантия на все компоненты и аккумуляторы"
    },
    {
      icon: <FaTruck style={{ color: '#000', fontSize: '64px' }} />,
      title: "Доставка до двери",
      description: "Привозим и поднимаем на любой этаж бесплатно"
    },
    {
      icon: <FaCreditCard style={{ color: '#000', fontSize: '64px' }} />,
      title: "Рассрочка 0%",
      description: "Рассрочка без переплат до 24 месяцев"
    },
    {
      icon: <FaExchangeAlt style={{ color: '#000', fontSize: '64px' }} />,
      title: "Трейд-ин",
      description: "Принимаем старые трициклы в зачет нового"
    }
  ];

  return (
    <section className="advantages" id="advantages">
      <div className="container">
        <h2 className="section-title">Наши преимущества</h2>
        <div className="advantages-grid">
          {advantages.map((advantage, index) => (
            <div key={index} className="advantage-card">
              <div className="advantage-icon">
                <span>{advantage.icon}</span>
              </div>
              <h3 className="advantage-title">{advantage.title}</h3>
              <p className="advantage-description">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
