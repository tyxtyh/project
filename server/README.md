# 🚀 EKO-BIKE Backend Server

Backend сервер для обработки форм и отправки email с сайта EKO-BIKE на почту **pasha007@eko-bike.ru**

---

## 📋 Содержание

- [Установка](#установка)
- [Настройка](#настройка)
- [Запуск](#запуск)
- [API Endpoints](#api-endpoints)
- [Тестирование](#тестирование)
- [Развертывание](#развертывание)

---

## 🔧 Установка

### 1. Перейдите в папку server:
```bash
cd server
```

### 2. Установите зависимости:
```bash
npm install
```

---

## ⚙️ Настройка

### 1. Создайте файл `.env` на основе примера:
```bash
cp env.example .env
```

### 2. Откройте `.env` и заполните настройки:

```env
# Server Configuration
PORT=5000

# Email Configuration (для Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Recipient Email
RECIPIENT_EMAIL=pasha007@eko-bike.ru

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3. Настройка Gmail для отправки:

#### Вариант A: Пароль приложения (Рекомендуется)

1. Перейдите в [Google Account Security](https://myaccount.google.com/security)
2. Включите **двухфакторную аутентификацию**
3. Перейдите в [App Passwords](https://myaccount.google.com/apppasswords)
4. Создайте новый пароль приложения для "Почта"
5. Скопируйте сгенерированный пароль в `EMAIL_PASS`

#### Вариант B: Обычный пароль (Не рекомендуется)

1. Перейдите в [Less Secure Apps](https://myaccount.google.com/lesssecureapps)
2. Включите доступ для небезопасных приложений
3. Используйте ваш обычный пароль в `EMAIL_PASS`

---

## 🚀 Запуск

### Режим разработки (с автоперезапуском):
```bash
npm run dev
```

### Продакшн режим:
```bash
npm start
```

После запуска вы увидите:
```
🚀 EKO-BIKE Server запущен!
📧 Email сервер работает на порту 5000
🌐 Frontend URL: http://localhost:3000
📬 Письма отправляются на: pasha007@eko-bike.ru
```

---

## 📡 API Endpoints

### 1. **POST** `/api/email/callback`
Отправка заявки на обратный звонок

**Body:**
```json
{
  "name": "Иван Иванов",
  "phone": "+7 999 123-45-67",
  "email": "ivan@example.com",
  "message": "Хочу узнать о трициклах"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Заявка успешно отправлена",
  "messageId": "<unique-id@gmail.com>"
}
```

---

### 2. **POST** `/api/email/consultation`
Отправка заявки на консультацию

**Body:**
```json
{
  "name": "Мария Петрова",
  "phone": "+7 999 987-65-43",
  "email": "maria@example.com",
  "message": "Нужна консультация"
}
```

---

### 3. **POST** `/api/email/order`
Отправка заказа товара

**Body:**
```json
{
  "fullName": "Петр Сидоров",
  "phone": "+7 999 111-22-33",
  "email": "petr@example.com",
  "address": "г. Москва, ул. Ленина, д. 10, кв. 5",
  "paymentMethod": "cash",
  "product": {
    "name": "Бумеранг ПРО",
    "price": 99900
  },
  "selectedEquipment": [
    {
      "id": "roof",
      "name": "Крыша для электротрициклов",
      "price": 6990
    }
  ],
  "totalPrice": 106890
}
```

---

### 4. **GET** `/api/email/test`
Проверка работы API

**Response:**
```json
{
  "success": true,
  "message": "Email API работает корректно",
  "endpoints": [...]
}
```

---

### 5. **GET** `/api/health`
Проверка здоровья сервера

---

## 🧪 Тестирование

### С помощью curl:

```bash
# Тест заявки на звонок
curl -X POST http://localhost:5000/api/email/callback \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Тест",
    "phone": "+7 999 123-45-67",
    "email": "test@example.com",
    "message": "Тестовое сообщение"
  }'
```

### С помощью Postman или Thunder Client:

1. Импортируйте коллекцию endpoints
2. Создайте POST запрос на `http://localhost:5000/api/email/callback`
3. В Body выберите `raw` → `JSON`
4. Вставьте тестовые данные
5. Отправьте запрос

---

## 🌐 Развертывание

### На Vercel, Render или Railway:

1. **Создайте аккаунт** на одной из платформ
2. **Подключите GitHub** репозиторий
3. **Укажите папку**: `server`
4. **Добавьте переменные окружения** из `.env`
5. **Деплой!**

### Переменные окружения для продакшн:

```
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
RECIPIENT_EMAIL=pasha007@eko-bike.ru
FRONTEND_URL=https://your-domain.com
```

---

## 📁 Структура проекта

```
server/
├── config/
│   └── emailConfig.js      # Конфигурация Nodemailer
├── routes/
│   └── emailRoutes.js      # API роуты
├── services/
│   └── emailService.js     # Логика отправки email
├── .gitignore
├── env.example             # Пример .env файла
├── package.json
├── README.md
└── server.js               # Точка входа
```

---

## 🔒 Безопасность

✅ Используйте пароли приложений Gmail  
✅ Не коммитьте `.env` файл  
✅ Используйте HTTPS в продакшн  
✅ Настройте CORS правильно  
✅ Валидируйте входные данные

---

## ❓ Проблемы и решения

### Ошибка: "Invalid login"
- Проверьте `EMAIL_USER` и `EMAIL_PASS`
- Используйте пароль приложения Gmail
- Включите двухфакторную аутентификацию

### Ошибка: "Connection timeout"
- Проверьте `EMAIL_HOST` и `EMAIL_PORT`
- Убедитесь что нет блокировки файрвола
- Попробуйте порт 465 с `secure: true`

### Письма не приходят:
- Проверьте папку "Спам"
- Проверьте `RECIPIENT_EMAIL`
- Посмотрите логи сервера

### CORS ошибки:
- Убедитесь что `FRONTEND_URL` правильный
- Проверьте что frontend делает запросы на правильный URL

---

## 📞 Поддержка

Если возникли проблемы:
- Email: pasha007@eko-bike.ru
- Телефон: +7 (499) 346-81-66

---

## 📝 Лицензия

ISC

