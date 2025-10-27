# 🚴 EKO-BIKE - Сайт продажи электротранспорта

Современный сайт для продажи электротрициклов и электровелосипедов с backend сервером для обработки заявок.

## 📧 Все заявки отправляются на: **pasha007@eko-bike.ru**

---

## 🚀 Быстрый старт

### 1. Установите зависимости:

```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

### 2. Настройте backend:

Создайте файл `server/.env`:

```env
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
RECIPIENT_EMAIL=pasha007@eko-bike.ru
FRONTEND_URL=http://localhost:3000
```

**Получите пароль приложения Gmail:**
https://myaccount.google.com/apppasswords

### 3. Запустите проект:

```bash
# Терминал 1: Backend
npm run server

# Терминал 2: Frontend
npm start
```

Сайт откроется на http://localhost:3000 🎉

---

## 📚 Документация

- **[BACKEND_SETUP.md](BACKEND_SETUP.md)** - Полная инструкция по настройке
- **[server/README.md](server/README.md)** - Документация API

---

## 🛠️ Технологии

### Frontend:
- React 19
- CSS3
- React Icons

### Backend:
- Node.js
- Express
- Nodemailer
- CORS

---

## 📋 Функции

✅ Каталог электротранспорта  
✅ Фильтрация по категориям  
✅ Модальные окна товаров  
✅ Форма обратного звонка  
✅ Форма консультации  
✅ Форма заказа товара  
✅ Отправка email на pasha007@eko-bike.ru  
✅ Галерея фотографий  
✅ Отзывы клиентов  
✅ Адаптивный дизайн  

---

## 📁 Структура проекта

```
rasprodazha/
├── server/              # Backend сервер (Node.js + Express)
│   ├── config/
│   ├── routes/
│   ├── services/
│   └── server.js
│
├── src/                 # Frontend React
│   ├── components/
│   ├── services/
│   └── App.js
│
├── public/
│   └── img/
│
└── package.json
```

---

## 🌐 Развертывание

### Backend: 
- Render.com
- Railway.app
- Vercel

### Frontend:
- Netlify
- Vercel
- GitHub Pages

Подробнее в **BACKEND_SETUP.md**

---

## 📞 Контакты

- Email: pasha007@eko-bike.ru
- Телефон: +7 (499) 346-81-66
- Адрес: г. Москва, Колодезный переулок 2Ас9

---

## 📝 Лицензия

ISC
