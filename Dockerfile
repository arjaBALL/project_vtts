FROM php:8.3-cli

WORKDIR /var/www

# System dependencies
RUN apt-get update && apt-get install -y \
    git curl unzip zip libpng-dev libonig-dev libxml2-dev \
    nodejs npm \
    && docker-php-ext-install pdo pdo_mysql

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# App files
COPY . .

# PHP deps
RUN composer install --no-dev --optimize-autoloader

# JS build
RUN npm install && npm run build

# Permissions
RUN chmod -R 775 storage bootstrap/cache

EXPOSE 10000

# Runtime commands (IMPORTANT for Render)
CMD php artisan optimize:clear && \
    php artisan storage:link || true && \
    php artisan migrate --force && \
    php artisan serve --host=0.0.0.0 --port=10000