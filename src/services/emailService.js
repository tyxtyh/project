// URL backend API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Отправка данных на backend API
 * @param {string} endpoint - Endpoint API
 * @param {Object} data - Данные для отправки
 * @returns {Promise}
 */
const sendToBackend = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_URL}/email/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Ошибка при отправке данных');
    }

    console.log('Данные успешно отправлены:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Ошибка отправки:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Отправка заявки на звонок
 */
export const sendCallbackRequest = async (formData) => {
  return await sendToBackend('callback', {
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    message: formData.message
  });
};

/**
 * Отправка заявки на консультацию
 */
export const sendConsultationRequest = async (formData) => {
  return await sendToBackend('consultation', {
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    message: formData.message
  });
};

/**
 * Отправка заказа товара
 */
export const sendProductOrder = async (formData, product, selectedEquipment, totalPrice) => {
  return await sendToBackend('order', {
    fullName: formData.fullName,
    phone: formData.phone,
    email: formData.email,
    address: formData.address,
    paymentMethod: formData.paymentMethod,
    product: {
      name: product.name,
      price: product.price
    },
    selectedEquipment: selectedEquipment,
    totalPrice: totalPrice
  });
};

