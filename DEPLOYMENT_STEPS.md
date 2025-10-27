# 🎯 Пошаговый деплой - Вариант 2 (Комбинированный)

## Вы делаете:
- ✅ Frontend → Ваш Timeweb хостинг (домен уже есть)
- ✅ Backend → Render.com (бесплатно)

---

# ЭТАП 1: Деплой Backend на Render.com (10 минут)

## Шаг 1.1: Регистрация на Render

1. Откройте: https://render.com
2. Нажмите **"Get Started"** или **"Sign Up"**
3. Зарегистрируйтесь через:
   - GitHub (рекомендую)
   - GitLab
   - или Email

---

## Шаг 1.2: Создание Web Service

### Если у вас НЕТ GitHub репозитория:

1. На Render нажмите **"New +"** → **"Web Service"**
2. Выберите **"Public Git repository"**
3. Введите URL (если код на GitHub) или нажмите **"Continue"**
4. **Или**: Загрузите код вручную через Dashboard

### Если хотите через GitHub (рекомендую):

1. Создайте репозиторий на GitHub
2. Загрузите туда папку вашего проекта
3. На Render: **"New +"** → **"Web Service"**
4. **"Build and deploy from a Git repository"**
5. Выберите ваш репозиторий

---

## Шаг 1.3: Настройки сервиса

Заполните поля:

```
Name: eko-bike-backend
Region: Frankfurt (Europe) или любой
Branch: main
Root Directory: server
Runtime: Node
Build Command: npm install
Start Command: npm start
```

Выберите план: **Free** (0$)

---

## Шаг 1.4: Переменные окружения

Нажмите **"Advanced"** → **"Add Environment Variable"**

Добавьте по одной:

```
KEY: PORT
VALUE: 5000

KEY: EMAIL_HOST
VALUE: smtp.yandex.ru

KEY: EMAIL_PORT
VALUE: 465

KEY: EMAIL_USER
VALUE: ваш_email@yandex.ru

KEY: EMAIL_PASS
VALUE: ваш_пароль_от_яндекса

KEY: RECIPIENT_EMAIL
VALUE: pasha007@eko-bike.ru

KEY: FRONTEND_URL
VALUE: http://ваш-домен.ru
```

⚠️ **ВАЖНО**: Замените `ваш-домен.ru` на ваш реальный домен!

---

## Шаг 1.5: Создание сервиса

1. Нажмите **"Create Web Service"**
2. Подождите 5-10 минут (идет деплой)
3. Статус изменится на **"Live"** (зеленая точка)

---

## Шаг 1.6: Скопируйте URL backend

Вверху страницы увидите URL типа:
```
https://eko-bike-backend-xxxx.onrender.com
```

**СКОПИРУЙТЕ ЕГО!** Он понадобится для frontend.

---

## Шаг 1.7: Проверка backend

Откройте в браузере:
```
https://eko-bike-backend-xxxx.onrender.com/api/health
```

Должен показать:
```json
{
  "status": "OK",
  "message": "EKO-BIKE Server is running",
  "timestamp": "2024-..."
}
```

✅ **Backend готов!**

---

# ЭТАП 2: Подготовка Frontend (5 минут)

## Шаг 2.1: Создайте файл .env

В корне проекта создайте файл `.env`:

```env
REACT_APP_API_URL=https://eko-bike-backend-xxxx.onrender.com/api
```

⚠️ Замените URL на ваш URL с Render (из шага 1.6)!

---

## Шаг 2.2: Создайте production build

Откройте терминал в корне проекта:

```bash
npm run build
```

Подождите 2-3 минуты. Должна появиться папка `build`.

---

## Шаг 2.3: Проверьте папку build

В папке `build` должны быть файлы:
- index.html
- static/
  - css/
  - js/
  - media/
- img/
- и другие

✅ Всё готово к загрузке!

---

# ЭТАП 3: Загрузка на Timeweb (10 минут)

## Шаг 3.1: Зайдите в панель Timeweb

1. Откройте: https://hosting.timeweb.ru/
2. Войдите в аккаунт
3. **Мои сайты** → выберите ваш сайт

---

## Шаг 3.2: Файловый менеджер

### Способ A: Через панель управления

1. **Файловый менеджер** или **Файлы**
2. Откройте папку `public_html` или `www` или `domains/ваш-домен.ru/public_html`
3. **Выделите ВСЕ файлы** в этой папке (старый сайт)
4. **Удалите** их
5. **Загрузите** все файлы из папки `build`:
   - Откройте папку `build` на компьютере
   - Выделите ВСЁ (Ctrl+A)
   - Перетащите в окно файлового менеджера Timeweb

⏳ Подождите пока загрузятся все файлы (может занять 5-10 минут)

### Способ B: Через FTP (FileZilla) - Быстрее

1. Скачайте FileZilla: https://filezilla-project.org/
2. В панели Timeweb найдите **FTP доступ**:
   - Хост: `ftp.ваш-домен.ru`
   - Логин: (указан в панели)
   - Пароль: (указан в панели или создайте новый)
3. Подключитесь в FileZilla
4. Справа (на сервере) перейдите в `public_html`
5. Удалите все старые файлы
6. Слева (на компьютере) откройте папку `build`
7. Перетащите ВСЕ файлы из `build` в `public_html`

---

## Шаг 3.3: Создайте .htaccess

В папке `public_html` создайте файл `.htaccess`:

**Через файловый менеджер:**
1. Нажмите **"Создать файл"**
2. Имя: `.htaccess`
3. Откройте его для редактирования
4. Вставьте:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

5. Сохраните

---

## Шаг 3.4: Проверьте домен

Откройте ваш сайт:
```
http://ваш-домен.ru
```

Сайт должен открыться! 🎉

Но пока **БЕЗ HTTPS** (это исправим на следующем шаге)

---

# ЭТАП 4: Настройка SSL (HTTPS) (5 минут)

## Шаг 4.1: Заказ SSL на Timeweb

1. В панели Timeweb: **Мои сайты** → ваш сайт
2. **SSL сертификаты** или **Безопасность**
3. **Заказать бесплатный SSL** (Let's Encrypt)
4. Подтвердите заказ
5. Подождите 5-15 минут

---

## Шаг 4.2: Проверка HTTPS

Откройте:
```
https://ваш-домен.ru
```

Должен открыться с замочком! 🔒

---

## Шаг 4.3: Обновите FRONTEND_URL в Backend

На Render.com:

1. Откройте ваш сервис `eko-bike-backend`
2. **Environment** (слева в меню)
3. Найдите переменную `FRONTEND_URL`
4. Измените на:
   ```
   https://ваш-домен.ru
   ```
   (с HTTPS!)
5. Нажмите **"Save Changes"**
6. Backend автоматически перезапустится (1-2 минуты)

---

# ЭТАП 5: Проверка работы (5 минут)

## ✅ Чек-лист:

### 1. Backend работает:
Откройте: `https://eko-bike-backend-xxxx.onrender.com/api/health`

Должен показать: `{"status":"OK",...}`

### 2. Frontend открывается:
Откройте: `https://ваш-домен.ru`

Должен открыться сайт

### 3. Все страницы работают:
- Главная ✅
- Каталог ✅
- Контакты ✅
- Галерея ✅

### 4. Картинки загружаются:
Проверьте что все фото отображаются

### 5. Формы отправляются:

**Тест 1: "Заказать звонок"**
1. Нажмите кнопку "Заказать звонок"
2. Заполните форму
3. Отправьте
4. Должна появиться модалка "Спасибо!" ✅

**Тест 2: "Получить каталог"**
1. Прокрутите до секции Gallery
2. Нажмите "Получить каталог"
3. Заполните и отправьте
4. Модалка "Спасибо!" ✅

**Тест 3: Проверка почты**
Откройте почту `pasha007@eko-bike.ru` - должны прийти письма!

---

# 🎉 ГОТОВО!

Ваш сайт работает онлайн!

- 🌐 **Frontend**: https://ваш-домен.ru
- 🔧 **Backend**: https://eko-bike-backend-xxxx.onrender.com
- 📧 **Email**: Письма на pasha007@eko-bike.ru
- 🔒 **SSL**: Включен
- 💰 **Стоимость**: 0₽ (используете что есть!)

---

# 🔄 Как обновлять сайт в будущем:

## Обновление контента/дизайна:

1. Внесите изменения в код
2. Создайте новый build:
   ```bash
   npm run build
   ```
3. Загрузите файлы из `build` на Timeweb (замените старые)
4. Готово!

## Обновление backend:

Если используете GitHub - просто:
```bash
git push
```
Render автоматически обновится.

---

# ⚠️ Важные моменты:

## Backend на Render Free:

- ✅ Бесплатно
- ⚠️ Засыпает через 15 минут без активности
- ⏰ Первый запрос после сна: 30-60 секунд
- 💡 **Решение**: Платный план $7/мес или купите VPS на Timeweb

## Чтобы backend не засыпал:

Можно настроить пинг каждые 10 минут (бесплатные сервисы):
- https://uptimerobot.com/
- https://cron-job.org/

Или купите Render Premium за $7/мес.

---

# 🆘 Если что-то не работает:

## Формы не отправляются:

1. Откройте консоль браузера (F12)
2. Посмотрите есть ли ошибки
3. Проверьте что в `.env` правильный URL backend
4. Пересоберите: `npm run build` и загрузите заново

## Сайт показывает ошибку:

1. Проверьте что все файлы загружены из `build`
2. Проверьте что есть файл `.htaccess`
3. Очистите кэш браузера (Ctrl+Shift+R)

## Backend не отвечает:

1. Проверьте статус на Render.com (должен быть "Live")
2. Посмотрите логи: **Logs** в меню
3. Проверьте переменные окружения

## Email не приходят:

1. Проверьте "Спам" в почте
2. Проверьте логи backend на Render
3. Проверьте `EMAIL_USER` и `EMAIL_PASS` в переменных

---

# 📞 Поддержка:

**Timeweb:**
- 📞 8 (800) 505-42-85
- 📧 support@timeweb.ru

**Render:**
- 📧 https://render.com/support

**Email:**
- 📧 pasha007@eko-bike.ru

---

Удачи! Всё получится! 🚀

