import React, { useState } from 'react';
import './Gallery.css';
import SuccessModal from './SuccessModal';
import { sendConsultationRequest } from '../services/emailService';

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    contactMethod: 'call'
  });

  const galleryImages = [
    {
      id: 1,
      src: '/img/gallery_pozhil.jfif',
      alt: 'Трициклы для пожилых',
      title: 'Трициклы для пожилых',
      description: 'Удобные и безопасные модели для комфортного передвижения'
    },
    {
      id: 2,
      src: '/img/gallery_krysha.jpg',
      alt: 'Трициклы с крышей',
      title: 'Трициклы с крышей',
      description: 'Защита от непогоды в любое время года'
    },
    {
      id: 3,
      src: '/img/gallery_samokat.jpg',
      alt: 'Электросамокаты',
      title: 'Электросамокаты',
      description: 'Легкие и маневренные для городских поездок'
    },
    {
      id: 4,
      src: '/img/gallery_gruz.webp',
      alt: 'Грузовые трициклы',
      title: 'Грузовые трициклы',
      description: 'Мощные модели для перевозки грузов'
    }
  ];

  const contactMethods = [
    { value: 'call', label: 'Звонок' },
    { value: 'whatsapp_call', label: 'WhatsApp Звонок' },
    { value: 'whatsapp_message', label: 'WhatsApp сообщение' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Отправляем заявку на получение каталога
      const result = await sendConsultationRequest({
        name: formData.name,
        phone: formData.phone,
        email: '',
        message: `Запрос каталога. Способ связи: ${contactMethods.find(m => m.value === formData.contactMethod)?.label || formData.contactMethod}`
      });
      
      if (result.success) {
        // Сбрасываем форму
        setFormData({ name: '', phone: '', contactMethod: 'call' });
        
        // Закрываем модалку формы и показываем модалку успеха
        setIsModalOpen(false);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="gallery">
        <div className="container">
          <div className="gallery-content">
            <div className="gallery-grid">
              {galleryImages.map((image) => (
                <div key={image.id} className="gallery-item">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="gallery-image"
                  />
                  <div className="gallery-overlay">
                    <h3 className="gallery-item-title">{image.title}</h3>
                    <p className="gallery-item-description">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="gallery-cta">
              <h2 className="gallery-title">
                Больше электротранспорта в расширенном каталоге
              </h2>
              <p className="gallery-description">
                Оставьте заявку и мы пришлем вам полный каталог с актуальными моделями и ценами
              </p>
              <button className="gallery-btn" onClick={openModal}>
                Получить каталог
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            
            <h3 className="modal-title">Получить каталог</h3>
            <p className="modal-subtitle">
              Заполните форму и мы отправим вам полный каталог электротрициклов
            </p>
            
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Ваше имя *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Введите ваше имя"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Номер телефона *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contactMethod">Способ связи</label>
                <select
                  id="contactMethod"
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleInputChange}
                >
                  {contactMethods.map((method) => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Модалка успеха */}
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)}
        type="consultation"
      />
    </>
  );
};

export default Gallery;
