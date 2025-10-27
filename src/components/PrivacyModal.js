import React, { useEffect } from 'react';
import './PrivacyModal.css';

const PrivacyModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="privacy-modal-overlay" onClick={onClose}>
      <div className="privacy-modal" onClick={(e) => e.stopPropagation()}>
        <div className="privacy-modal-header">
          <h2>Политика конфиденциальности</h2>
          <button className="privacy-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="privacy-modal-content">
          <div className="privacy-section">
            <h3>1. Общие положения</h3>
            <p>
              Настоящая политика обработки персональных данных составлена в соответствии с требованиями 
              Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок 
              обработки персональных данных и меры по обеспечению безопасности персональных данных.
            </p>
          </div>

          <div className="privacy-section">
            <h3>2. Цели обработки персональных данных</h3>
            <p>
              Персональные данные обрабатываются в следующих целях:
            </p>
            <ul>
              <li>Обработка заявок и заказов</li>
              <li>Предоставление консультационных услуг</li>
              <li>Информирование о товарах и услугах</li>
              <li>Соблюдение требований законодательства РФ</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h3>3. Категории обрабатываемых персональных данных</h3>
            <p>
              Мы обрабатываем следующие категории персональных данных:
            </p>
            <ul>
              <li>Фамилия, имя, отчество</li>
              <li>Номер телефона</li>
              <li>Адрес электронной почты</li>
              <li>Адрес доставки (при необходимости)</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h3>4. Сроки обработки персональных данных</h3>
            <p>
              Персональные данные обрабатываются в течение срока, необходимого для достижения целей 
              обработки, но не более 5 лет с момента получения согласия субъекта персональных данных.
            </p>
          </div>

          <div className="privacy-section">
            <h3>5. Права субъекта персональных данных</h3>
            <p>
              Субъект персональных данных имеет право:
            </p>
            <ul>
              <li>Получать информацию об обработке его персональных данных</li>
              <li>Требовать уточнения персональных данных</li>
              <li>Требовать удаления персональных данных</li>
              <li>Отзывать согласие на обработку персональных данных</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h3>6. Меры защиты персональных данных</h3>
            <p>
              Мы принимаем необходимые правовые, организационные и технические меры для защиты 
              персональных данных от неправомерного или случайного доступа, уничтожения, изменения, 
              блокирования, копирования, предоставления, распространения персональных данных.
            </p>
          </div>

          <div className="privacy-section">
            <h3>7. Контактная информация</h3>
            <p>
              По всем вопросам, связанным с обработкой персональных данных, вы можете обратиться 
              к нам по телефону или электронной почте, указанным на сайте.
            </p>
          </div>

          <div className="privacy-footer">
            <p>
              <strong>Дата последнего обновления:</strong> {new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>
        </div>
        
        <div className="privacy-modal-footer">
          <button className="privacy-modal-btn" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
