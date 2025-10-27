import React, { useState } from 'react';
import './ProductOrderModal.css';
import SuccessModal from './SuccessModal';
import { sendProductOrder } from '../services/emailService';

const ProductOrderModal = ({ product, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'cash',
    additionalEquipment: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Дополнительные товары для электротрициклов и пассажирских электротрициклов
  const tricycleAccessories = [
    { id: 'roof', name: 'Крыша для электротрициклов', price: 6990, image: '/img/catalog/dlc/krysha_tryc.jpg' },
    { id: 'cover', name: 'Чехол', price: 3900, image: '/img/catalog/dlc/chehol.jpg' },
    { id: 'trailer', name: 'Прицеп ATV-PRO Standard 1450', price: 20610, image: '/img/catalog/dlc/pricep_tryc.jpg' },
    { id: 'hitch', name: 'Фаркоп', price: 10000, image: '/img/catalog/dlc/farkop.jpg' },
    { id: 'waterproof', name: 'Гидроизоляция', price: 10500, image: '/img/catalog/dlc/gydro_tryc.jpg' }
  ];

  // Дополнительные товары для электровелосипедов и трехколесных электровелосипедов
  const bicycleAccessories = [
    { id: 'waterproof-bike', name: 'Гидроизоляция', price: 5500, image: '/img/catalog/dlc/gydro_velo.png' },
    { id: 'bike-trailer', name: 'Велоприцеп', price: 19900, image: '/img/catalog/dlc/pricep_velo.jpg' },
    { id: 'cover-bike', name: 'Чехол', price: 3900, image: '/img/catalog/dlc/chehol.jpg' },
    { id: 'speed-controller', name: 'Регулятор скорости', price: 6500, image: '/img/catalog/dlc/regulator_velo.jpg' }
  ];

  // Определяем какие дополнительные товары показывать в зависимости от категории
  const getAccessoriesForCategory = () => {
    if (!product) return [];
    
    const categoryId = product.category;
    
    // Для электротрициклов и пассажирских электротрициклов
    if (categoryId === 'electric-tricycles' || categoryId === 'passenger-tricycles') {
      return tricycleAccessories;
    }
    
    // Для электровелосипедов и трехколесных электровелосипедов
    if (categoryId === 'electric-bikes' || categoryId === 'electric-fatbikes') {
      return bicycleAccessories;
    }
    
    return [];
  };

  const additionalEquipmentOptions = getAccessoriesForCategory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (equipmentId) => {
    setFormData(prev => ({
      ...prev,
      additionalEquipment: prev.additionalEquipment.includes(equipmentId)
        ? prev.additionalEquipment.filter(id => id !== equipmentId)
        : [...prev.additionalEquipment, equipmentId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const selectedEquipment = additionalEquipmentOptions.filter(
      option => formData.additionalEquipment.includes(option.id)
    );
    const totalPrice = product.price + selectedEquipment.reduce((sum, item) => sum + item.price, 0);
    
    try {
      const result = await sendProductOrder(formData, product, selectedEquipment, totalPrice);
      
      if (result.success) {
        // Сбрасываем форму
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          address: '',
          paymentMethod: 'cash',
          additionalEquipment: []
        });
        
        // Закрываем форму и показываем модалку успеха
        onClose();
        setIsSuccessModalOpen(true);
      } else {
        alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже или позвоните нам по телефону: +7 (499) 346-81-66');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже или позвоните нам по телефону: +7 (499) 346-81-66');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !product) {
    // Если модалка закрыта, все равно рендерим SuccessModal если он открыт
    return isSuccessModalOpen ? (
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)}
        type="order"
      />
    ) : null;
  }

  const selectedEquipment = additionalEquipmentOptions.filter(
    option => formData.additionalEquipment.includes(option.id)
  );
  const totalPrice = product.price + selectedEquipment.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
    <div className="product-order-modal-overlay" onClick={onClose}>
      <div className="product-order-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="product-order-modal-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        <div className="product-order-modal-header">
          <h2 className="product-order-modal-title">Заказ модель трицикла</h2>
          <div className="product-order-info">
            <span className="product-order-name">{product.name}</span>
            <span className="product-order-price">{product.price.toLocaleString()} ₽</span>
          </div>
        </div>

        <form className="product-order-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">ФИО *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="Введите ваше полное имя"
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Адрес доставки *</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="Введите полный адрес доставки"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Способ оплаты *</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              required
            >
              <option value="cash">Наличными при получении</option>
              <option value="card">Банковской картой</option>
              <option value="transfer">Банковским переводом</option>
            </select>
          </div>

          <div className="form-group">
            <label>Дополнительное оборудование</label>
            {additionalEquipmentOptions.length > 0 ? (
              <div className="equipment-options">
                {additionalEquipmentOptions.map(option => (
                  <label key={option.id} className="equipment-option">
                    <input
                      type="checkbox"
                      checked={formData.additionalEquipment.includes(option.id)}
                      onChange={() => handleCheckboxChange(option.id)}
                    />
                    <div className="equipment-content">
                      <div className="equipment-image">
                        <img src={option.image} alt={option.name} />
                      </div>
                      <div className="equipment-info">
                        <span className="equipment-name">{option.name}</span>
                        <span className="equipment-price">+{option.price.toLocaleString()} ₽</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <p className="no-accessories">Дополнительное оборудование для данной категории не доступно</p>
            )}
          </div>

          <div className="order-summary">
            <div className="summary-item">
              <span>Трицикл {product.name}</span>
              <span>{product.price.toLocaleString()} ₽</span>
            </div>
            {selectedEquipment.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name}</span>
                <span>+{item.price.toLocaleString()} ₽</span>
              </div>
            ))}
            <div className="summary-total">
              <span>Итого:</span>
              <span>{totalPrice.toLocaleString()} ₽</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={isSubmitting}>
              Отмена
            </button>
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Оформить заказ'}
            </button>
          </div>
        </form>
      </div>
    </div>
    {/* SuccessModal рендерится за пределами модалки */}
    {isSuccessModalOpen && (
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)}
        type="order"
      />
    )}
    </>
  );
};

export default ProductOrderModal;
