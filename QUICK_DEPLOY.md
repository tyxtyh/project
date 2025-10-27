# ⚡ Быстрый деплой за 15 минут

## 🎯 Что получите:
- ✅ Сайт доступен онлайн
- ✅ Формы отправляют письма на pasha007@eko-bike.ru
- ✅ HTTPS и SSL сертификат
- ✅ БЕСПЛАТНО!

---

## 📝 Шаг 1: Создайте Build (2 минуты)

```bash
npm run build
```

Это создаст папку `build` с готовым сайтом.

---

## 🚀 Шаг 2: Deploy Backend на Render.com (5 минут)

1. Откройте: https://render.com
2. Зарегистрируйтесь (можно через GitHub)
3. Нажмите **"New +"** → **"Web Service"**
4. Нажмите **"Build and deploy from a Git repository"** → **"Next"**
5. Подключите GitHub или выберите **"Public Git repository"** → **"Continue"**
6. Настройки:
   ```
   Name: eko-bike-backend
   Root Directory: server
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```
7. Выберите **Free** план
8. Нажмите **"Advanced"** → **"Add Environment Variable"**
9. Добавьте:
   ```
   EMAIL_HOST = smtp.yandex.ru
   EMAIL_PORT = 465
   EMAIL_USER = ваш_email@yandex.ru
   EMAIL_PASS = ваш_пароль
   RECIPIENT_EMAIL = pasha007@eko-bike.ru
   FRONTEND_URL = (пока оставьте пустым)
   ```
10. Нажмите **"Create Web Service"**
11. Подождите 5-10 минут
12. **СКОПИРУЙТЕ URL**: `https://eko-bike-backend-xxxx.onrender.com`

✅ Backend готов!

---

## 🎨 Шаг 3: Deploy Frontend на Netlify (5 минут)

### Способ A: Drag & Drop (Самый простой)

1. Откройте: https://netlify.com
2. Зарегистрируйтесь
3. Нажмите **"Add new site"** → **"Deploy manually"**
4. **Перетащите папку `build`** в окно
5. Готово! Скопируйте URL: `https://random-name.netlify.app`

### Способ B: Через GitHub (Автоматический)

1. Загрузите код на GitHub
2. На Netlify: **"Add new site"** → **"Import from Git"**
3. Выберите репозиторий
4. Настройки:
   ```
   Build command: npm run build
   Publish directory: build
   ```
5. Deploy!

---

## 🔗 Шаг 4: Свяжите Frontend и Backend (3 минуты)

### 4.1 Обновите Backend

В Render:
1. Откройте ваш сервис
2. **Environment** → **Add Environment Variable**
3. Добавьте:
   ```
   FRONTEND_URL = https://ваш-сайт.netlify.app
   ```
4. Сохраните (автоматически redeploy)

### 4.2 Обновите Frontend

В Netlify:
1. **Site settings** → **Environment variables**
2. Добавьте:
   ```
   REACT_APP_API_URL = https://eko-bike-backend-xxxx.onrender.com/api
   ```
3. **Deploys** → **Trigger deploy** → **Deploy site**

---

## ✅ Шаг 5: Проверка (1 минута)

### Backend:
Откройте: `https://eko-bike-backend-xxxx.onrender.com/api/health`

Должен показать:
```json
{"status":"OK","message":"EKO-BIKE Server is running"}
```

### Frontend:
Откройте: `https://ваш-сайт.netlify.app`

### Формы:
1. Нажмите "Заказать звонок"
2. Заполните форму
3. Отправьте
4. Проверьте почту **pasha007@eko-bike.ru**

---

## 🌐 Шаг 6: Подключение домена (ОПЦИОНАЛЬНО)

### Если у вас есть домен:

#### В Netlify:
1. **Domain settings** → **Add custom domain**
2. Введите ваш домен
3. Netlify покажет инструкции по DNS

#### У регистратора домена:
Добавьте записи:
```
A record: @ → 75.2.60.5
CNAME: www → ваш-сайт.netlify.app
```

Подождите 1-24 часа для распространения DNS.

#### Обновите переменные:

**Render** (FRONTEND_URL):
```
FRONTEND_URL=https://ваш-домен.ru
```

**Netlify** (REACT_APP_API_URL) - без изменений

---

## 🎉 ГОТОВО!

Ваш сайт работает онлайн!

- 🌐 Frontend: https://ваш-сайт.netlify.app
- 🔧 Backend: https://eko-bike-backend-xxxx.onrender.com
- 📧 Письма идут на: pasha007@eko-bike.ru

---

## 📊 Важные моменты:

### ⚠️ Render Free Plan:
- Сервер "засыпает" через 15 минут без активности
- Первый запрос после сна займет 30-60 секунд
- **Решение**: Платный план $7/мес или VPS

### ✅ Netlify:
- Всегда активен
- 100GB трафика/месяц бесплатно
- Автоматический SSL

---

## 🔄 Обновление сайта:

### Frontend:
```bash
npm run build
```
Затем перетащите `build` снова на Netlify

### Backend:
Просто push на GitHub - автоматически обновится на Render

---

## 🆘 Проблемы?

### Формы не отправляются:
1. Проверьте что backend запущен: `/api/health`
2. Проверьте переменную `REACT_APP_API_URL` в Netlify
3. Проверьте `FRONTEND_URL` в Render
4. Откройте консоль браузера (F12) → ищите ошибки

### Backend показывает ошибку:
1. Проверьте все переменные окружения в Render
2. Проверьте логи: **Logs** в Render

### Email не приходят:
1. Проверьте `EMAIL_USER` и `EMAIL_PASS`
2. Проверьте папку "Спам"
3. Проверьте логи backend

---

Email поддержки: pasha007@eko-bike.ru

