# 🚀 Деплой сайта на Timeweb Hosting

## 📋 Что вам понадобится:

1. ✅ Аккаунт на [Timeweb](https://hosting.timeweb.ru/)
2. ✅ Тариф с поддержкой Node.js (от "Start" и выше)
3. ✅ Домен (можно купить там же на Timeweb)
4. ✅ Яндекс почта (уже настроена)

---

## 💰 Стоимость:

- **Виртуальный хостинг Start**: от 199₽/мес (подойдет для начала)
- **VDS/VPS SSD-1**: от 300₽/мес (рекомендую для Node.js)
- **Домен .ru**: ~300₽/год

**Итого**: ~500₽/мес + домен

---

## 🎯 Два варианта размещения:

### Вариант 1: VPS (Рекомендую) ⭐
**Плюсы**: Полный контроль, Node.js, быстро, надежно
**Минусы**: Требуется настройка через SSH

### Вариант 2: Виртуальный хостинг
**Плюсы**: Простая панель управления
**Минусы**: Ограниченная поддержка Node.js

---

# 📦 ВАРИАНТ 1: VPS Timeweb (Рекомендую)

## Шаг 1: Заказ VPS

1. Откройте [Timeweb VPS](https://hosting.timeweb.ru/vps)
2. Выберите тариф **VDS/VPS SSD-1** (от 300₽/мес)
3. Операционная система: **Ubuntu 22.04**
4. Оформите заказ
5. Получите данные для доступа на email:
   - IP адрес сервера
   - Логин: `root`
   - Пароль

---

## Шаг 2: Подключение к серверу

### Windows (PowerShell):
```bash
ssh root@ваш-ip-адрес
# Введите пароль
```

### Или используйте PuTTY:
1. Скачайте [PuTTY](https://www.putty.org/)
2. Host Name: `ваш-ip-адрес`
3. Port: `22`
4. Подключитесь

---

## Шаг 3: Установка необходимого ПО

```bash
# Обновление системы
apt update && apt upgrade -y

# Установка Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Проверка установки
node -v
npm -v

# Установка Git
apt install -y git

# Установка PM2 (менеджер процессов)
npm install -g pm2

# Установка Nginx
apt install -y nginx

# Установка SSL (Let's Encrypt)
apt install -y certbot python3-certbot-nginx
```

---

## Шаг 4: Загрузка проекта на сервер

### Способ A: Через Git (Рекомендую)

```bash
# Создайте репозиторий на GitHub
# Затем на сервере:

cd /var/www
git clone https://github.com/ваш-username/rasprodazha.git
cd rasprodazha
```

### Способ B: Через FileZilla

1. Скачайте [FileZilla](https://filezilla-project.org/)
2. Подключитесь:
   - Хост: `ваш-ip-адрес`
   - Порт: `22`
   - Протокол: `SFTP`
   - Логин: `root`
   - Пароль: `ваш-пароль`
3. Загрузите папку проекта в `/var/www/rasprodazha`

---

## Шаг 5: Настройка Backend

```bash
cd /var/www/rasprodazha/server

# Установка зависимостей
npm install

# Создание .env файла
nano .env
```

Добавьте в `.env`:

```env
PORT=5000
EMAIL_HOST=smtp.yandex.ru
EMAIL_PORT=465
EMAIL_USER=ваш_email@yandex.ru
EMAIL_PASS=ваш_пароль
RECIPIENT_EMAIL=pasha007@eko-bike.ru
FRONTEND_URL=http://ваш-домен.ru
```

Сохраните: `Ctrl+X`, `Y`, `Enter`

```bash
# Запуск через PM2
pm2 start server.js --name eko-backend

# Автозапуск при перезагрузке
pm2 startup
pm2 save

# Проверка статуса
pm2 status
pm2 logs eko-backend
```

---

## Шаг 6: Сборка Frontend

```bash
cd /var/www/rasprodazha

# Установка зависимостей
npm install

# Создание production build
npm run build
```

Это создаст папку `build` с готовым сайтом.

---

## Шаг 7: Настройка Nginx

```bash
# Создание конфига
nano /etc/nginx/sites-available/rasprodazha
```

Добавьте:

```nginx
server {
    listen 80;
    server_name ваш-домен.ru www.ваш-домен.ru;

    # Frontend
    root /var/www/rasprodazha/build;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Кэширование статики
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

Сохраните и активируйте:

```bash
# Создание символической ссылки
ln -s /etc/nginx/sites-available/rasprodazha /etc/nginx/sites-enabled/

# Удаление дефолтного конфига
rm /etc/nginx/sites-enabled/default

# Проверка конфига
nginx -t

# Перезапуск Nginx
systemctl restart nginx
```

---

## Шаг 8: Настройка домена

### В панели Timeweb:

1. **Домены** → **Список доменов**
2. Если домена нет - купите новый
3. **DNS записи** → **Добавить запись**

Добавьте записи:

```
Тип: A
Имя: @
Значение: ваш-ip-адрес-vps
TTL: 3600

Тип: A
Имя: www
Значение: ваш-ip-адрес-vps
TTL: 3600
```

Подождите 1-2 часа для распространения DNS.

---

## Шаг 9: Установка SSL (HTTPS)

```bash
# Получение сертификата Let's Encrypt
certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru

# Следуйте инструкциям на экране:
# 1. Введите email
# 2. Согласитесь с условиями (Y)
# 3. Выберите редирект на HTTPS (2)

# Автообновление сертификата (каждые 3 месяца)
certbot renew --dry-run
```

Готово! Теперь сайт доступен по **https://ваш-домен.ru**

---

## Шаг 10: Проверка

### Backend:
```bash
curl http://localhost:5000/api/health
```

Должен вернуть:
```json
{"status":"OK","message":"EKO-BIKE Server is running"}
```

### Frontend:
Откройте в браузере: `https://ваш-домен.ru`

### Формы:
1. Заполните любую форму
2. Проверьте почту `pasha007@eko-bike.ru`

---

## 🔄 Обновление сайта

### Через Git:

```bash
cd /var/www/rasprodazha
git pull

# Backend
cd server
npm install
pm2 restart eko-backend

# Frontend
cd ..
npm install
npm run build
```

### Через FileZilla:

1. Подключитесь к серверу
2. Замените файлы
3. Перезапустите backend: `pm2 restart eko-backend`
4. Пересоберите frontend: `npm run build`

---

## 📊 Мониторинг

### Просмотр логов:

```bash
# Backend логи
pm2 logs eko-backend

# Nginx логи
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Статус сервисов:

```bash
# Backend
pm2 status

# Nginx
systemctl status nginx

# Использование ресурсов
htop
```

---

## 🔒 Безопасность

### 1. Firewall:

```bash
# Установка UFW
apt install -y ufw

# Разрешаем нужные порты
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS

# Включаем firewall
ufw enable

# Проверка статуса
ufw status
```

### 2. Смена SSH порта (опционально):

```bash
nano /etc/ssh/sshd_config

# Измените строку:
Port 22  →  Port 2222

# Перезапуск SSH
systemctl restart sshd

# Не забудьте разрешить новый порт:
ufw allow 2222
```

### 3. Отключение root логина (опционально):

```bash
# Создайте нового пользователя
adduser admin
usermod -aG sudo admin

# Затем в /etc/ssh/sshd_config
PermitRootLogin no
```

---

## 📋 Полезные команды

```bash
# PM2
pm2 start server.js          # Запуск
pm2 stop eko-backend         # Остановка
pm2 restart eko-backend      # Перезапуск
pm2 delete eko-backend       # Удаление
pm2 logs                     # Логи всех процессов
pm2 monit                    # Мониторинг

# Nginx
systemctl start nginx        # Запуск
systemctl stop nginx         # Остановка
systemctl restart nginx      # Перезапуск
systemctl reload nginx       # Перечитать конфиг
nginx -t                     # Проверка конфига

# SSL
certbot renew                # Обновить сертификат
certbot certificates         # Список сертификатов

# Система
df -h                        # Использование диска
free -h                      # Использование RAM
htop                         # Мониторинг процессов
```

---

## ❓ Решение проблем

### Backend не запускается:

```bash
pm2 logs eko-backend
# Проверьте ошибки в логах
```

### Nginx показывает 502:

```bash
# Проверьте что backend запущен
pm2 status

# Проверьте логи
tail -f /var/log/nginx/error.log
```

### Формы не отправляются:

```bash
# Проверьте .env файл
cat /var/www/rasprodazha/server/.env

# Проверьте что backend работает
curl http://localhost:5000/api/health
```

### Email не приходят:

```bash
# Проверьте логи backend
pm2 logs eko-backend

# Проверьте настройки email в .env
```

---

## 💡 Оптимизация

### 1. Кэширование на Nginx:

Уже настроено в конфиге выше (статика кэшируется на 30 дней)

### 2. Сжатие Gzip:

Уже включено в конфиге

### 3. HTTP/2:

```bash
# В конфиге Nginx измените:
listen 443 ssl http2;
```

---

## 📞 Поддержка Timeweb

- **Телефон**: 8 (800) 505-42-85
- **Email**: support@timeweb.ru
- **Онлайн чат**: На сайте timeweb.ru
- **Документация**: https://timeweb.com/ru/help/

---

## 🎉 Готово!

Ваш сайт работает на Timeweb:

- 🌐 Сайт: https://ваш-домен.ru
- 🔒 HTTPS: Автоматический SSL
- 📧 Email: Письма на pasha007@eko-bike.ru
- 🚀 Backend: Всегда активен
- ⚡ Быстро и надежно

---

## 📚 Дополнительно

- Резервное копирование через панель Timeweb
- Мониторинг доступен в личном кабинете
- Можно добавить CDN через Timeweb Cloud

---

Если возникнут вопросы - обращайтесь к поддержке Timeweb! 🚀

