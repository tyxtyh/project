const { createTransporter } = require('../config/emailConfig');
require('dotenv').config();

const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'pasha007@eko-bike.ru';

/**
 * Отправка письма с заявкой на обратный звонок
 */
const sendCallbackRequest = async (data) => {
  const { name, phone, email, message } = data;

  const mailOptions = {
    from: `"Сайт Распродажа" <${process.env.EMAIL_USER}>`,
    to: RECIPIENT_EMAIL,
    subject: '🔔 Новая заявка на обратный звонок',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4CAF50;">Заявка на обратный звонок</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Телефон:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Email:</strong> ${email || 'Не указан'}</p>
          <p><strong>Сообщение:</strong> ${message || 'Не указано'}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          Письмо отправлено автоматически с сайта Распродажа<br>
          ${new Date().toLocaleString('ru-RU')}
        </p>
      </div>
    `,
    text: `
      Новая заявка на обратный звонок
      
      Имя: ${name}
      Телефон: ${phone}
      Email: ${email || 'Не указан'}
      Сообщение: ${message || 'Не указано'}
      
      Дата: ${new Date().toLocaleString('ru-RU')}
    `
  };

  const transporter = createTransporter();
  return await transporter.sendMail(mailOptions);
};

/**
 * Отправка письма с заявкой на консультацию
 */
const sendConsultationRequest = async (data) => {
  const { name, phone, email, message } = data;

  const mailOptions = {
    from: `"Сайт Распродажа" <${process.env.EMAIL_USER}>`,
    to: RECIPIENT_EMAIL,
    subject: '📋 Новая заявка на консультацию',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2196F3;">Заявка на консультацию</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Телефон:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Email:</strong> ${email || 'Не указан'}</p>
          <p><strong>Сообщение:</strong> ${message || 'Не указано'}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          Письмо отправлено автоматически с сайта Распродажа<br>
          ${new Date().toLocaleString('ru-RU')}
        </p>
      </div>
    `,
    text: `
      Новая заявка на консультацию
      
      Имя: ${name}
      Телефон: ${phone}
      Email: ${email || 'Не указан'}
      Сообщение: ${message || 'Не указано'}
      
      Дата: ${new Date().toLocaleString('ru-RU')}
    `
  };

  const transporter = createTransporter();
  return await transporter.sendMail(mailOptions);
};

/**
 * Отправка письма с заказом товара
 */
const sendProductOrder = async (data) => {
  const { fullName, phone, email, address, paymentMethod, product, selectedEquipment, totalPrice } = data;

  const paymentMethods = {
    'cash': 'Наличными при получении',
    'card': 'Банковской картой',
    'transfer': 'Банковским переводом'
  };

  const equipmentHTML = selectedEquipment && selectedEquipment.length > 0
    ? selectedEquipment.map(item => `<li>${item.name} - ${item.price.toLocaleString()} ₽</li>`).join('')
    : '<li>Не выбрано</li>';

  const mailOptions = {
    from: `"Сайт Распродажа" <${process.env.EMAIL_USER}>`,
    to: RECIPIENT_EMAIL,
    subject: `🛒 Новый заказ: ${product.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF9800;">Новый заказ товара</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #333;">Информация о заказчике</h3>
          <p><strong>ФИО:</strong> ${fullName}</p>
          <p><strong>Телефон:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Email:</strong> ${email || 'Не указан'}</p>
          <p><strong>Адрес доставки:</strong> ${address}</p>
          <p><strong>Способ оплаты:</strong> ${paymentMethods[paymentMethod] || paymentMethod}</p>
        </div>

        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #333;">Информация о заказе</h3>
          <p><strong>Товар:</strong> ${product.name}</p>
          <p><strong>Цена товара:</strong> ${product.price.toLocaleString()} ₽</p>
          
          <p><strong>Дополнительное оборудование:</strong></p>
          <ul style="margin: 5px 0;">
            ${equipmentHTML}
          </ul>
          
          <p style="font-size: 18px; color: #FF9800; margin-top: 15px;">
            <strong>Итоговая стоимость: ${totalPrice.toLocaleString()} ₽</strong>
          </p>
        </div>

        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          Письмо отправлено автоматически с сайта Распродажа<br>
          ${new Date().toLocaleString('ru-RU')}
        </p>
      </div>
    `,
    text: `
      Новый заказ товара
      
      ИНФОРМАЦИЯ О ЗАКАЗЧИКЕ:
      ФИО: ${fullName}
      Телефон: ${phone}
      Email: ${email || 'Не указан'}
      Адрес доставки: ${address}
      Способ оплаты: ${paymentMethods[paymentMethod] || paymentMethod}
      
      ИНФОРМАЦИЯ О ЗАКАЗЕ:
      Товар: ${product.name}
      Цена товара: ${product.price.toLocaleString()} ₽
      
      Дополнительное оборудование:
      ${selectedEquipment && selectedEquipment.length > 0 
        ? selectedEquipment.map(item => `- ${item.name} - ${item.price.toLocaleString()} ₽`).join('\n')
        : '- Не выбрано'}
      
      ИТОГОВАЯ СТОИМОСТЬ: ${totalPrice.toLocaleString()} ₽
      
      Дата: ${new Date().toLocaleString('ru-RU')}
    `
  };

  const transporter = createTransporter();
  return await transporter.sendMail(mailOptions);
};

module.exports = {
  sendCallbackRequest,
  sendConsultationRequest,
  sendProductOrder
};

