# 🎯 НАЧНИТЕ ОТСЮДА!

## ✅ Что уже готово:

1. ✅ **Backend сервер** - Node.js + Express + Nodemailer
2. ✅ **Frontend** - React приложение с 3 формами
3. ✅ **EmailJS удален** - теперь используем профессиональный backend
4. ✅ **Все формы** отправляют письма через backend на **pasha007@eko-bike.ru**

---

## 🚀 Запуск за 3 шага:

### Шаг 1: Настройте email (2 минуты)

1. Откройте https://myaccount.google.com/apppasswords
2. Создайте пароль приложения для "Почта"
3. Скопируйте пароль (16 символов)

### Шаг 2: Создайте файл конфигурации (1 минута)

Создайте файл `server/.env`:

```env
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=ВСТАВЬТЕ_ПАРОЛЬ_ПРИЛОЖЕНИЯ_СЮДА
RECIPIENT_EMAIL=pasha007@eko-bike.ru
FRONTEND_URL=http://localhost:3000
```

### Шаг 3: Запустите (30 секунд)

```bash
# Терминал 1 - Backend
npm run server

# Терминал 2 - Frontend  
npm start
```

---

## 🎉 ГОТОВО!

Откройте http://localhost:3000 и протестируйте формы!

---

## 📖 Полная документация:

- **BACKEND_SETUP.md** - детальная инструкция
- **server/README.md** - API документация
- **README.md** - общая информация

---

## ❓ Проблемы?

### Backend не запускается:
```bash
cd server
npm install
```

### Формы не работают:
1. Проверьте что backend запущен: http://localhost:5000/api/health
2. Посмотрите консоль браузера (F12)
3. Проверьте файл `server/.env`

### Письма не приходят:
1. Проверьте "Спам" в почте pasha007@eko-bike.ru
2. Посмотрите логи backend сервера
3. Убедитесь что используете пароль приложения Gmail

---

## 📞 Контакты:

pasha007@eko-bike.ru  
+7 (499) 346-81-66

