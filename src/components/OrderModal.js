import React, { useState, useEffect } from 'react';
import './OrderModal.css';
import PrivacyModal from './PrivacyModal';
import SuccessModal from './SuccessModal';
import { sendCallbackRequest } from '../services/emailService';

const OrderModal = ({ isOpen, onClose, type = 'call' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    agree: false
  });
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isPrivacyModalOpen) {
      const privacyModal = document.createElement('div');
      privacyModal.id = 'privacy-modal-portal';
      document.body.appendChild(privacyModal);
      
      return () => {
        const existingModal = document.getElementById('privacy-modal-portal');
        if (existingModal) {
          document.body.removeChild(existingModal);
        }
      };
    }
  }, [isPrivacyModalOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await sendCallbackRequest(formData);
      
      if (result.success) {
        // Сбрасываем форму
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
          agree: false
        });
        
        // Закрываем форму и показываем модалку успеха
        onClose();
        setIsSuccessModalOpen(true);
      } else {
        alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или позвоните нам по телефону: +7 (499) 346-81-66');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или позвоните нам по телефону: +7 (499) 346-81-66');
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = type === 'call' ? 'Заказать звонок' : 'Рассчитать стоимость';
  const description = type === 'call' 
    ? 'Заполните форму, и наш менеджер перезвонит вам в течение часа'
    : 'Заполните форму, мы посчитаем примерную стоимость и перезвоним вам для консультации';

  if (!isOpen) {
    // Если модалка закрыта, все равно рендерим SuccessModal если он открыт
    return isSuccessModalOpen ? (
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)}
        type="callback"
      />
    ) : null;
  }

  return (
    <>
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Телефон"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email (необязательно)"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Сообщение (необязательно)"
              value={formData.message}
              onChange={handleChange}
              rows="3"
            />
          </div>
          
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
              />
              <span className="checkmark"></span>
              Согласен с <button type="button" className="privacy-link" onClick={() => setIsPrivacyModalOpen(true)}>политикой конфиденциальности</button>
            </label>
          </div>
          
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : (type === 'call' ? 'Заказать звонок' : 'Рассчитать стоимость')}
              </button>
        </form>
      </div>
      
      {isPrivacyModalOpen && (
        <PrivacyModal 
          isOpen={isPrivacyModalOpen} 
          onClose={() => setIsPrivacyModalOpen(false)} 
        />
      )}
    </div>
    {/* SuccessModal рендерится за пределами модалки */}
    {isSuccessModalOpen && (
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)}
        type="callback"
      />
    )}
    </>
  );
};

export default OrderModal;
