import React, { useState, useEffect } from 'react';
import './ContactForm.css';
import PrivacyModal from './PrivacyModal';
import SuccessModal from './SuccessModal';
import { sendConsultationRequest } from '../services/emailService';

const ContactForm = () => {
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
      const result = await sendConsultationRequest(formData);
      
      if (result.success) {
        // Сбрасываем форму
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
          agree: false
        });
        
        // Показываем модалку успеха
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

  return (
    <section className="contact-form" id="contacts">
      <div className="container">
        <div className="form-wrapper">
          <div className="form-content">
            <h2>Оставьте заявку на консультацию или расчет</h2>
            <p>Заполните форму, мы посчитаем примерную стоимость и перезвоним вам для консультации</p>
            
            <form onSubmit={handleSubmit} className="form">
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
                  placeholder="Email"
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
                  rows="4"
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
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              </button>
            </form>
          </div>
          
          <div className="form-info">
            <h3>Что будет после отправки заявки?</h3>
            <div className="info-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-text">Позвоним</div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-text">Зададим уточняющие вопросы</div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-text">Договоримся о встрече</div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-text">Проконсультируем и посчитаем цены</div>
              </div>
            </div>
            
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <div className="contact-title">Телефон</div>
                  <div className="contact-value">+7 (499) 346-81-66</div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {isPrivacyModalOpen && (
        <PrivacyModal 
          isOpen={isPrivacyModalOpen} 
          onClose={() => setIsPrivacyModalOpen(false)} 
        />
      )}
      
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)}
        type="consultation"
      />
    </section>
  );
};

export default ContactForm;
