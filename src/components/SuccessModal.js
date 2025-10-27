import React, { useEffect } from 'react';
import './SuccessModal.css';

const SuccessModal = ({ isOpen, onClose, type = 'default' }) => {
  useEffect(() => {
    if (isOpen) {
      // Автоматически закрываем через 4 секунды
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getContent = () => {
    switch (type) {
      case 'callback':
        return {
          title: 'Заявка отправлена!',
          message: 'Спасибо за обращение! Наш менеджер свяжется с вами в ближайшее время.',
          icon: '✓'
        };
      case 'consultation':
        return {
          title: 'Заявка принята!',
          message: 'Мы получили вашу заявку на консультацию. Наш специалист свяжется с вами в ближайшее время.',
          icon: '✓'
        };
      case 'order':
        return {
          title: 'Заказ оформлен!',
          message: 'Ваш заказ успешно принят. Мы свяжемся с вами для подтверждения деталей доставки.',
          icon: '✓'
        };
      default:
        return {
          title: 'Успешно!',
          message: 'Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.',
          icon: '✓'
        };
    }
  };

  const content = getContent();

  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="success-icon-wrapper">
          <div className="success-icon">{content.icon}</div>
        </div>
        <h2 className="success-title">{content.title}</h2>
        <p className="success-message">{content.message}</p>
        <button className="success-close-btn" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;

