FROM php:8.3-cli

WORKDIR /var/www

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl unzip zip libpng-dev libonig-dev libxml2-dev \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy project files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Install JS dependencies and build
RUN npm install && npm run build

# Create SQLite database
RUN touch database/database.sqlite

# Permissions
RUN chmod -R 775 storage bootstrap/cache

# Cache config
RUN php artisan config:cache && php artisan route:cache

EXPOSE 10000

CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=10000