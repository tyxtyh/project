const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');

/**
 * POST /api/email/callback
 * Отправка заявки на обратный звонок
 */
router.post('/callback', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // Валидация
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Имя и телефон обязательны для заполнения'
      });
    }

    // Отправка письма
    const result = await emailService.sendCallbackRequest({
      name,
      phone,
      email,
      message
    });

    console.log('✅ Письмо отправлено:', result.messageId);

    res.json({
      success: true,
      message: 'Заявка успешно отправлена',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('❌ Ошибка отправки письма:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка при отправке заявки',
      details: error.message
    });
  }
});

/**
 * POST /api/email/consultation
 * Отправка заявки на консультацию
 */
router.post('/consultation', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // Валидация
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Имя и телефон обязательны для заполнения'
      });
    }

    // Отправка письма
    const result = await emailService.sendConsultationRequest({
      name,
      phone,
      email,
      message
    });

    console.log('✅ Письмо отправлено:', result.messageId);

    res.json({
      success: true,
      message: 'Заявка успешно отправлена',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('❌ Ошибка отправки письма:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка при отправке заявки',
      details: error.message
    });
  }
});

/**
 * POST /api/email/order
 * Отправка заказа товара
 */
router.post('/order', async (req, res) => {
  try {
    const { fullName, phone, email, address, paymentMethod, product, selectedEquipment, totalPrice } = req.body;

    // Валидация
    if (!fullName || !phone || !address || !product) {
      return res.status(400).json({
        success: false,
        error: 'Все обязательные поля должны быть заполнены'
      });
    }

    // Отправка письма
    const result = await emailService.sendProductOrder({
      fullName,
      phone,
      email,
      address,
      paymentMethod,
      product,
      selectedEquipment,
      totalPrice
    });

    console.log('✅ Заказ отправлен:', result.messageId);

    res.json({
      success: true,
      message: 'Заказ успешно отправлен',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('❌ Ошибка отправки заказа:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка при отправке заказа',
      details: error.message
    });
  }
});

/**
 * GET /api/email/test
 * Тестовый endpoint для проверки работы
 */
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Email API работает корректно',
    endpoints: [
      'POST /api/email/callback - Заявка на звонок',
      'POST /api/email/consultation - Заявка на консультацию',
      'POST /api/email/order - Заказ товара'
    ]
  });
});

module.exports = router;

