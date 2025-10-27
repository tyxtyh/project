const nodemailer = require('nodemailer');
require('dotenv').config();

// Создаем транспорт для отправки писем
const createTransporter = () => {
  const port = parseInt(process.env.EMAIL_PORT) || 587;
  
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: port,
    secure: port === 465, // true для 465, false для других портов
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Проверка конфигурации
const verifyConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email сервер готов к отправке писем');
    return true;
  } catch (error) {
    console.error('❌ Ошибка подключения к email серверу:', error.message);
    console.log('\n⚠️  Проверьте настройки в файле .env:');
    console.log('   - EMAIL_HOST');
    console.log('   - EMAIL_PORT');
    console.log('   - EMAIL_USER');
    console.log('   - EMAIL_PASS\n');
    return false;
  }
};

module.exports = {
  createTransporter,
  verifyConnection
};

