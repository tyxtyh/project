# 🎯 Быстрый старт: Backend + Frontend

Полная инструкция по запуску сайта EKO-BIKE с backend сервером для отправки email.

---

## 📧 Все письма идут на: **pasha007@eko-bike.ru**

---

## 🚀 Шаг 1: Настройка Backend (5 минут)

### 1. Создайте файл `.env` в папке `server`:

```bash
cd server
```

Создайте файл `.env` со следующим содержимым:

```env
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
RECIPIENT_EMAIL=pasha007@eko-bike.ru
FRONTEND_URL=http://localhost:3000
```

### 2. Получите пароль приложения Gmail:

#### Простой способ:

1. Откройте https://myaccount.google.com/security
2. Включите **двухфакторную аутентификацию**
3. Откройте https://myaccount.google.com/apppasswords
4. Выберите "Почта" и "Компьютер Windows"
5. Нажмите "Создать"
6. **Скопируйте** сгенерированный пароль (16 символов)
7. Вставьте его в `.env` файл в поле `EMAIL_PASS`

### 3. Установите зависимости:

```bash
npm install
```

### 4. Запустите backend сервер:

```bash
npm start
```

Вы должны увидеть:
```
🚀 EKO-BIKE Server запущен!
📧 Email сервер работает на порту 5000
✅ Email сервер готов к отправке писем
```

---

## 🎨 Шаг 2: Запуск Frontend (1 минута)

### 1. В **НОВОМ** терминале перейдите в корневую папку:

```bash
cd ..
```
(если вы были в папке server)

### 2. Запустите React приложение:

```bash
npm start
```

Сайт откроется на http://localhost:3000

---

## ✅ Готово! Теперь всё работает:

### ✨ Что работает:

1. **OrderModal** - модальное окно "Заказать звонок" ✅
2. **ContactForm** - форма в контактах ✅  
3. **ProductOrderModal** - форма заказа товара ✅

Все формы отправляют письма через ваш backend на **pasha007@eko-bike.ru**

---

## 🧪 Тестирование

### 1. Откройте сайт: http://localhost:3000
### 2. Найдите любую кнопку "Заказать звонок"
### 3. Заполните форму и отправьте
### 4. Проверьте почту **pasha007@eko-bike.ru**

---

## 📁 Структура проекта

```
rasprodazha/
├── server/                  # 🔧 Backend сервер
│   ├── config/
│   ├── routes/
│   ├── services/
│   ├── .env               # ⚠️ ВАЖНО! Создайте этот файл
│   ├── server.js
│   └── package.json
│
├── src/                    # 🎨 Frontend React
│   ├── components/
│   ├── services/
│   │   └── emailService.js  # Отправка на backend
│   └── App.js
│
└── package.json
```

---

## 🌐 Развертывание в продакшн

### Backend (Render, Railway, или Vercel):

1. Создайте аккаунт на [render.com](https://render.com)
2. Нажмите "New +" → "Web Service"
3. Подключите GitHub репозиторий
4. Укажите:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Добавьте переменные окружения:
   - `EMAIL_HOST`
   - `EMAIL_PORT`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `RECIPIENT_EMAIL`
   - `FRONTEND_URL` (URL вашего frontend после деплоя)
6. Нажмите "Create Web Service"

### Frontend (Netlify, Vercel):

1. Создайте аккаунт на [netlify.com](https://netlify.com)
2. Перетащите папку `build` или подключите GitHub
3. Добавьте переменную окружения:
   - `REACT_APP_API_URL` = URL вашего backend (например: https://your-app.onrender.com/api)
4. Деплой!

---

## 🔧 Режим разработки

### Терминал 1 (Backend):
```bash
cd server
npm run dev
```

### Терминал 2 (Frontend):
```bash
npm start
```

---

## ❓ Частые проблемы

### 1. Backend не запускается:
```
✅ Проверьте что создали .env файл в папке server
✅ Проверьте что установили зависимости: npm install
✅ Проверьте что порт 5000 свободен
```

### 2. Формы показывают ошибку:
```
✅ Убедитесь что backend запущен (http://localhost:5000/api/health)
✅ Проверьте консоль браузера (F12)
✅ Проверьте настройки Gmail
```

### 3. Письма не приходят:
```
✅ Проверьте папку "Спам" в почте
✅ Проверьте логи backend сервера
✅ Убедитесь что EMAIL_USER и EMAIL_PASS правильные
✅ Используйте пароль приложения Gmail, не обычный пароль
```

### 4. CORS ошибки:
```
✅ Убедитесь что FRONTEND_URL в .env правильный
✅ Проверьте что backend разрешает запросы с вашего frontend
```

---

## 📊 Преимущества backend подхода:

✅ **Безопасность** - API ключи не видны в frontend  
✅ **Надежность** - Nodemailer стабильнее чем EmailJS  
✅ **Контроль** - полный контроль над отправкой писем  
✅ **Бесплатно** - не нужно платить за Email API  
✅ **Профессионально** - стандартный подход в индустрии

---

## 📞 Контакты

Если возникли проблемы:
- Email: pasha007@eko-bike.ru
- Телефон: +7 (499) 346-81-66

---

## 🎉 Готово!

Теперь у вас полноценный сайт с backend сервером для отправки email! 🚀

