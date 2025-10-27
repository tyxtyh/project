# 🚀 Инструкция по развертыванию сайта на хостинг

## 📋 Что вам понадобится:

1. ✅ **Домен** - любой домен (например, rasprodazha-eko.ru)
2. ✅ **Хостинг для backend** - Render.com, Railway.app или VPS
3. ✅ **Хостинг для frontend** - Netlify, Vercel или GitHub Pages
4. ✅ **Email настройки** - Яндекс почта (уже есть)

---

## 🎯 План развертывания:

```
1. Деплой Backend (Node.js сервер) → Получаем URL: https://api.ваш-домен.com
2. Деплой Frontend (React сайт) → Получаем URL: https://ваш-домен.com
3. Связываем Frontend и Backend через переменные окружения
4. Настраиваем домен
```

---

# 📦 ВАРИАНТ 1: Простой (Рекомендуется)

## Backend: Render.com (БЕСПЛАТНО)
## Frontend: Netlify (БЕСПЛАТНО)

---

## 🔧 BACKEND (Render.com)

### Шаг 1: Подготовка

1. Создайте аккаунт на [render.com](https://render.com)
2. Подключите GitHub репозиторий (или загрузите код вручную)

### Шаг 2: Создание Web Service

1. Нажмите **"New +"** → **"Web Service"**
2. Выберите репозиторий (или загрузите вручную)
3. Настройки:
   - **Name**: `eko-bike-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### Шаг 3: Добавьте переменные окружения

Нажмите **"Environment"** и добавьте:

```
PORT=5000
EMAIL_HOST=smtp.yandex.ru
EMAIL_PORT=465
EMAIL_USER=ваш_email@yandex.ru
EMAIL_PASS=ваш_пароль
RECIPIENT_EMAIL=pasha007@eko-bike.ru
FRONTEND_URL=https://ваш-домен.com
```

⚠️ **ВАЖНО**: `FRONTEND_URL` пока оставьте пустым, добавите после деплоя frontend

### Шаг 4: Deploy

1. Нажмите **"Create Web Service"**
2. Подождите 5-10 минут
3. Скопируйте URL: `https://eko-bike-backend.onrender.com`

### Шаг 5: Проверка

Откройте: `https://eko-bike-backend.onrender.com/api/health`

Должен показать:
```json
{
  "status": "OK",
  "message": "EKO-BIKE Server is running"
}
```

✅ **Backend готов!**

---

## 🎨 FRONTEND (Netlify)

### Шаг 1: Создайте production build

В корневой папке проекта:

```bash
npm run build
```

Это создаст папку `build` с готовым сайтом.

### Шаг 2: Создайте файл настроек Netlify

Создайте файл `netlify.toml` в корне проекта:

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  REACT_APP_API_URL = "https://eko-bike-backend.onrender.com/api"
```

⚠️ Замените URL на ваш URL backend с Render

### Шаг 3: Deploy на Netlify

**Способ A: Через сайт (Проще)**

1. Откройте [netlify.com](https://netlify.com)
2. Зарегистрируйтесь (можно через GitHub)
3. Нажмите **"Add new site"** → **"Deploy manually"**
4. Перетащите папку `build` в окно
5. Готово! Получите URL: `https://random-name.netlify.app`

**Способ B: Через GitHub (Автоматический деплой)**

1. Загрузите код на GitHub
2. На Netlify: **"Add new site"** → **"Import from Git"**
3. Выберите репозиторий
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
5. **Environment variables**:
   - `REACT_APP_API_URL` = `https://eko-bike-backend.onrender.com/api`
6. Deploy!

### Шаг 4: Добавьте переменные окружения

В Netlify:
1. **Site settings** → **Environment variables**
2. Добавьте:
   ```
   REACT_APP_API_URL=https://eko-bike-backend.onrender.com/api
   ```
3. **Redeploy**

✅ **Frontend готов!**

---

## 🌐 Настройка домена

### Если у вас есть свой домен (например, rasprodazha-eko.ru):

#### Frontend:

1. В Netlify: **Domain settings** → **Add custom domain**
2. Введите: `rasprodazha-eko.ru`
3. Netlify покажет DNS записи для настройки
4. Добавьте в настройках домена:
   ```
   A record: @ → 75.2.60.5
   CNAME: www → random-name.netlify.app
   ```

#### Backend (опционально):

1. В Render: **Settings** → **Custom domain**
2. Добавьте: `api.rasprodazha-eko.ru`
3. Добавьте DNS запись:
   ```
   CNAME: api → eko-bike-backend.onrender.com
   ```

#### Обновите переменные:

**Backend** (`FRONTEND_URL`):
```
FRONTEND_URL=https://rasprodazha-eko.ru
```

**Frontend** (`REACT_APP_API_URL`):
```
REACT_APP_API_URL=https://api.rasprodazha-eko.ru/api
```

Redeploy оба сервиса!

---

# 📦 ВАРИАНТ 2: VPS (Для продвинутых)

## Если у вас свой VPS сервер:

### Требования:
- Ubuntu 20.04+
- Node.js 18+
- Nginx
- SSL сертификат (Let's Encrypt)

### Установка на VPS:

```bash
# Подключитесь к серверу
ssh user@ваш-сервер.ru

# Установите Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установите PM2
sudo npm install -g pm2

# Клонируйте проект
git clone https://github.com/ваш-repo/rasprodazha.git
cd rasprodazha

# Backend
cd server
npm install
nano .env  # Добавьте настройки
pm2 start server.js --name eko-backend
pm2 save

# Frontend
cd ..
npm install
npm run build

# Nginx
sudo nano /etc/nginx/sites-available/rasprodazha

# Добавьте конфиг (см. ниже)
sudo ln -s /etc/nginx/sites-available/rasprodazha /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d rasprodazha-eko.ru -d www.rasprodazha-eko.ru
```

### Nginx конфиг:

```nginx
server {
    listen 80;
    server_name rasprodazha-eko.ru www.rasprodazha-eko.ru;

    # Frontend
    root /home/user/rasprodazha/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔍 Проверка после деплоя

### 1. Backend работает:
```bash
curl https://api.rasprodazha-eko.ru/api/health
```

### 2. Frontend открывается:
Откройте: `https://rasprodazha-eko.ru`

### 3. Формы отправляются:
1. Заполните любую форму
2. Проверьте почту `pasha007@eko-bike.ru`

---

## 📊 Мониторинг

### Render.com:
- Бесплатный план "засыпает" через 15 минут без активности
- Первый запрос после сна займет 30-60 секунд
- Для постоянной работы: платный план ($7/месяц)

### Netlify:
- 100GB трафика/месяц бесплатно
- Автоматический SSL
- CDN по всему миру

---

## 🛠️ Обновление сайта

### Netlify (автодеплой с GitHub):
```bash
git add .
git commit -m "Обновление"
git push
# Автоматически задеплоится!
```

### Render (автодеплой с GitHub):
Аналогично - просто push в GitHub

### VPS:
```bash
ssh user@сервер
cd rasprodazha
git pull
npm run build
pm2 restart eko-backend
```

---

## 📝 Чеклист деплоя

Frontend:
- [ ] Создан production build (`npm run build`)
- [ ] Добавлена переменная `REACT_APP_API_URL`
- [ ] Сайт открывается
- [ ] Все страницы работают
- [ ] Картинки загружаются

Backend:
- [ ] Добавлены все переменные окружения
- [ ] `/api/health` возвращает OK
- [ ] Email настройки правильные
- [ ] CORS настроен правильно (`FRONTEND_URL`)

Формы:
- [ ] "Заказать звонок" - отправляет письмо
- [ ] "Получить каталог" - отправляет письмо  
- [ ] "Форма консультации" - отправляет письмо
- [ ] "Заказ товара" - отправляет письмо
- [ ] Модалка "Спасибо" появляется
- [ ] Письма приходят на `pasha007@eko-bike.ru`

---

## 💰 Стоимость

### Бесплатно:
- ✅ Render.com (Backend) - БЕСПЛАТНО
- ✅ Netlify (Frontend) - БЕСПЛАТНО
- ✅ SSL сертификат - БЕСПЛАТНО
- ✅ Домен - ~300-500₽/год

### Платный вариант (если нужно):
- 💎 Render Premium: $7/месяц (backend всегда активен)
- 💎 VPS: от 300₽/месяц
- 💎 Netlify Pro: $19/месяц (больше трафика)

---

## 🆘 Поддержка

Если возникли проблемы при деплое:
1. Проверьте логи в Render/Netlify
2. Убедитесь что переменные окружения добавлены
3. Проверьте URL backend правильный
4. Посмотрите консоль браузера (F12)

Email: pasha007@eko-bike.ru

