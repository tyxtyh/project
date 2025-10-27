# 🌐 Деплой на Timeweb Виртуальный Хостинг

## ⚠️ Важно понять ваш тариф!

Зайдите в панель управления Timeweb и проверьте:

### ✅ Если у вас тариф с поддержкой Node.js:
- "Хостинг Lite+" и выше
- "Конструктор сайтов" НЕ подойдет
- Нужна поддержка Node.js

### ❌ Если простой тариф без Node.js:
Придется купить VPS или обновить тариф

---

## 🔍 Как проверить возможности тарифа:

1. Зайдите в панель Timeweb
2. **Мои сайты** → выберите свой сайт
3. Посмотрите в разделе **"Возможности"** или **"Языки программирования"**
4. Должно быть: **Node.js** ✅

---

# 📦 ВАРИАНТ 1: Виртуальный хостинг с Node.js

## ⚠️ Ограничения:

Backend на виртуальном хостинге Timeweb работает **НЕ СТАБИЛЬНО**:
- ❌ Node.js может перезапускаться
- ❌ Ограничения по памяти
- ❌ Сложная настройка
- ⚠️ Не рекомендуется для production

**Рекомендация**: Используйте комбинированный подход (см. Вариант 2)

---

# 🎯 ВАРИАНТ 2: Комбинированный (РЕКОМЕНДУЮ!)

## Frontend на вашем хостинге + Backend на бесплатном Render

Это оптимально:
- ✅ Frontend на вашем домене
- ✅ Backend на бесплатном Render.com
- ✅ Просто настроить
- ✅ Надежно работает

---

## Шаг 1: Deploy Backend на Render.com (БЕСПЛАТНО)

### 1.1 Регистрация:
https://render.com

### 1.2 Создание сервиса:
1. **New +** → **Web Service**
2. Подключите GitHub или используйте публичный репозиторий
3. Настройки:
   ```
   Name: eko-bike-backend
   Root Directory: server
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

### 1.3 Переменные окружения:
```
EMAIL_HOST=smtp.yandex.ru
EMAIL_PORT=465
EMAIL_USER=ваш_email@yandex.ru
EMAIL_PASS=ваш_пароль
RECIPIENT_EMAIL=pasha007@eko-bike.ru
FRONTEND_URL=http://ваш-домен.ru
```

### 1.4 Deploy:
Нажмите **Create Web Service** → Получите URL:
```
https://eko-bike-backend-xxxx.onrender.com
```

✅ Backend готов!

---

## Шаг 2: Загрузка Frontend на Timeweb

### 2.1 Создайте production build:

На вашем компьютере:
```bash
npm run build
```

Это создаст папку `build` со всеми файлами сайта.

### 2.2 Настройте переменную API:

**ВАЖНО!** Перед созданием build, создайте файл `.env` в корне проекта:

```env
REACT_APP_API_URL=https://eko-bike-backend-xxxx.onrender.com/api
```

Замените URL на ваш URL с Render!

Затем пересоберите:
```bash
npm run build
```

### 2.3 Загрузка файлов на Timeweb:

**Способ A: Через панель управления**

1. Зайдите в **Мои сайты** → выберите ваш сайт
2. **Файловый менеджер**
3. Откройте папку `public_html` или `www`
4. **Удалите** все содержимое (index.html и т.д.)
5. **Загрузите** все файлы из папки `build`:
   - Выделите всё в `build`
   - Перетащите в `public_html`

**Способ B: Через FileZilla (быстрее)**

1. Скачайте [FileZilla](https://filezilla-project.org/)
2. Подключитесь:
   - **Хост**: ftp.ваш-домен.ru (смотрите в панели Timeweb)
   - **Порт**: 21
   - **Протокол**: FTP
   - **Логин**: ваш логин FTP
   - **Пароль**: ваш пароль FTP
3. Перейдите в `public_html`
4. Удалите старые файлы
5. Загрузите все файлы из папки `build`

---

## Шаг 3: Настройка .htaccess для React Router

В папке `public_html` создайте файл `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Если файл или директория существуют, используем их
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Иначе перенаправляем на index.html
  RewriteRule . /index.html [L]
</IfModule>

# Включаем GZIP сжатие
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Кэширование статики
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

---

## Шаг 4: Настройка домена

Если домен уже привязан к сайту:

1. **Мои сайты** → ваш сайт
2. **Домены** → проверьте что домен привязан
3. Если нет - **Добавить домен**

Домен должен автоматически работать.

---

## Шаг 5: Обновите FRONTEND_URL в Backend

На Render.com:

1. Откройте ваш backend сервис
2. **Environment** → Измените:
   ```
   FRONTEND_URL=http://ваш-домен.ru
   ```
3. Сохраните (автоматически redeploy)

---

## Шаг 6: SSL (HTTPS)

### В панели Timeweb:

1. **Мои сайты** → ваш сайт
2. **SSL сертификаты**
3. **Заказать бесплатный SSL** (Let's Encrypt)
4. Подождите 5-10 минут

Готово! Сайт доступен по **https://ваш-домен.ru**

### Обновите FRONTEND_URL:

На Render.com измените:
```
FRONTEND_URL=https://ваш-домен.ru
```

---

## ✅ Проверка

### 1. Backend работает:
```
https://eko-bike-backend-xxxx.onrender.com/api/health
```

Должен показать:
```json
{"status":"OK","message":"EKO-BIKE Server is running"}
```

### 2. Frontend открывается:
```
https://ваш-домен.ru
```

### 3. Формы работают:
1. Заполните любую форму
2. Отправьте
3. Проверьте почту `pasha007@eko-bike.ru`

---

## 🔄 Обновление сайта

### Frontend:

1. Внесите изменения в код
2. Создайте новый build:
   ```bash
   npm run build
   ```
3. Загрузите файлы из `build` на хостинг через FileZilla

### Backend:

Если используете GitHub:
```bash
git push
```
Render автоматически обновится.

---

## 💰 Стоимость:

```
Timeweb хостинг:  уже есть ✅
Backend Render:   0₽ (бесплатно)
SSL:              0₽ (Let's Encrypt)
Домен:            уже есть ✅
─────────────────────────────
ИТОГО:            0₽ (используете то что есть!)
```

---

# 📦 ВАРИАНТ 3: Только Timeweb VPS

Если хотите всё на Timeweb - купите VPS:

**Плюсы:**
- ✅ Всё на одном хостинге
- ✅ Backend всегда активен
- ✅ Полный контроль
- ✅ Быстрее (серверы в России)

**Стоимость:**
- VPS SSD-1: ~300₽/мес

**Инструкция:** См. файл `TIMEWEB_DEPLOYMENT.md`

---

## 🤔 Какой вариант выбрать?

### Вариант 2 (Комбинированный) - если:
- ✅ У вас уже есть хостинг и домен
- ✅ Хотите сэкономить
- ✅ Небольшой трафик
- ⚠️ Можете подождать 30-60 сек при первом запросе (backend засыпает)

### Вариант 3 (VPS) - если:
- ✅ Нужна стабильная работа 24/7
- ✅ Хотите чтобы сайт отвечал мгновенно
- ✅ Профессиональный проект
- ✅ Готовы платить ~300₽/мес

---

## 📋 Чеклист для Варианта 2:

Frontend на Timeweb:
- [ ] Создан production build (`npm run build`)
- [ ] Добавлена переменная `REACT_APP_API_URL` в `.env`
- [ ] Файлы загружены в `public_html`
- [ ] Создан файл `.htaccess`
- [ ] Домен привязан к сайту
- [ ] SSL сертификат установлен

Backend на Render:
- [ ] Сервис создан на Render.com
- [ ] Переменные окружения добавлены
- [ ] `/api/health` возвращает OK
- [ ] `FRONTEND_URL` указывает на ваш домен

Тест:
- [ ] Сайт открывается
- [ ] Формы отправляют письма
- [ ] Модалка "Спасибо" появляется
- [ ] Письма приходят на `pasha007@eko-bike.ru`

---

## ❓ Как узнать свой тип хостинга?

В панели Timeweb:

1. **Мои услуги** → **Хостинг**
2. Посмотрите название тарифа:
   - "Конструктор" → НЕ подойдет
   - "Start", "Optimal", "Advanced" → Попробуйте Вариант 2
   - VPS → Используйте Вариант 3

---

## 🆘 Поддержка

**Timeweb:**
- 📞 8 (800) 505-42-85
- 📧 support@timeweb.ru

**Email:**
- 📧 pasha007@eko-bike.ru

---

## 🎉 Рекомендация:

**Начните с Варианта 2** (Frontend на Timeweb + Backend на Render):
- Бесплатно
- Быстро настроить
- Используете ваш домен
- Можно перейти на VPS позже если нужно

Если Render будет засыпать и это мешает - купите VPS за 300₽/мес.

---

Удачи! 🚀

