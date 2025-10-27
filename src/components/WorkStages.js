import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaBox, FaTruck, FaGraduationCap } from 'react-icons/fa';
import './WorkStages.css';

const WorkStages = ({ onCatalogClick, onCallbackClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const stages = [
    {
      id: 1,
      title: "Подбор трицикла",
      duration: "1-3 дня",
      description: "Вы выбираете понравившийся трицикл или предоставляете свои требования. Мы согласовываем детали, вносим коррективы по вашим пожеланиям.",
      buttonText: "Выбрать трицикл в каталоге",
      buttonColor: "green",
      icon: <FaSearch style={{ color: '#ffa726', fontSize: '48px' }} />
    },
    {
      id: 2,
      title: "Заказ",
      duration: "1-2 дня",
      description: "Оформляем заказ, согласовываем все детали и условия. Уточняем адрес доставки и вносим предоплату. Начинаем подготовку к отправке.",
      buttonText: "Оформить заказ",
      buttonColor: "green",
      icon: <FaShoppingCart style={{ color: '#ffa726', fontSize: '48px' }} />
    },
    {
      id: 3,
      title: "Упаковка",
      duration: "1-3 дня",
      description: "Подготавливаем трицикл к транспортировке. Проводим финальную проверку, упаковываем в защитную упаковку. Гарантируем сохранность при перевозке.",
      buttonText: "Подробнее",
      buttonColor: "green",
      icon: <FaBox style={{ color: '#ffa726', fontSize: '48px' }} />
    },
    {
      id: 4,
      title: "Доставка",
      duration: "3-7 дней",
      description: "Доставляем трицикл в назначенный день и время. Работаем с надежными транспортными компаниями. Отслеживание доставки в реальном времени.",
      buttonText: "Подробнее",
      buttonColor: "green",
      icon: <FaTruck style={{ color: '#ffa726', fontSize: '48px' }} />
    },
    {
      id: 5,
      title: "Обучение и финальная доставка",
      duration: "1 день",
      description: "Проводим обучение управлению трициклом. Передаем документы и гарантийные обязательства. Вы получаете готовый к использованию трицикл.",
      buttonText: "Подробнее",
      buttonColor: "green",
      icon: <FaGraduationCap style={{ color: '#ffa726', fontSize: '48px' }} />
    }
  ];

  const nextStage = () => {
    if (isAnimating || currentIndex >= stages.length - 1) return;
    setIsAnimating(true);
    setCurrentIndex(prevIndex => prevIndex + 1);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevStage = () => {
    if (isAnimating || currentIndex <= 0) return;
    setIsAnimating(true);
    setCurrentIndex(prevIndex => prevIndex - 1);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Убираем автопрокрутку - пользователь сам перелистывает

  return (
    <section className="work-stages" id="services">
      <div className="container">
        <div className="stages-header">
          <h2 className="section-title">Этапы работы</h2>
          <div className="stages-navigation">
            <button 
              className={`nav-btn nav-btn-prev ${isAnimating ? 'disabled' : ''}`} 
              onClick={prevStage}
              disabled={isAnimating}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <button 
              className={`nav-btn nav-btn-next ${isAnimating ? 'disabled' : ''}`} 
              onClick={nextStage}
              disabled={isAnimating}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="stages-slider">
          <div className="stages-container">
            <div 
              className="stages-grid"
              style={{
                transform: `translateX(-${currentIndex * (600 + 30)}px)`
              }}
            >
              {stages.map((stage, index) => (
                <div 
                  key={stage.id} 
                  className="stage-card"
                >
                  <div className="stage-header">
                    <div className="stage-icon">{stage.icon}</div>
                    <div className="stage-info">
                      <h3 className="stage-title">{stage.title}</h3>
                      <span className="stage-duration">{stage.duration}</span>
                    </div>
                  </div>
                  
                  <p className="stage-description">{stage.description}</p>
                  
                  <button 
                    className={`stage-btn stage-btn-${stage.buttonColor}`}
                    onClick={() => {
                      if (stage.id === 1) {
                        // Для первого этапа - переход к каталогу
                        onCatalogClick();
                      } else if (stage.id === 2) {
                        // Для второго этапа - модалка обратного звонка
                        onCallbackClick();
                      } else {
                        // Для остальных этапов - модалка обратного звонка
                        onCallbackClick();
                      }
                    }}
                  >
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                      {stage.buttonColor === 'green' && (
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      )}
                      {stage.buttonColor === 'blue' && (
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      )}
                      {stage.buttonColor === 'orange' && (
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      )}
                      {stage.buttonColor === 'purple' && (
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      )}
                    </svg>
                    {stage.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkStages;
