FROM php:8.3-apache

WORKDIR /var/www/html

# System dependencies
RUN apt-get update && apt-get install -y \
    git curl unzip zip libpng-dev libonig-dev libxml2-dev \
    nodejs npm \
    && docker-php-ext-install pdo pdo_mysql

# Enable Apache rewrite module
RUN a2enmod rewrite

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# App files
COPY . .

# PHP deps
RUN composer install --no-dev --optimize-autoloader

# JS build
RUN npm install && npm run build

# Permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Point Apache to Laravel's /public folder
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf

# Create entrypoint script
RUN echo '#!/bin/bash\n\
set -e\n\
php artisan optimize:clear\n\
php artisan storage:link || true\n\
php artisan migrate --force\n\
# Add this line to create cache table if missing\n\
php artisan cache:table\n\
php artisan migrate --force\n\
sed -i "s/80/${PORT}/g" /etc/apache2/ports.conf\n\
sed -i "s/80/${PORT}/g" /etc/apache2/sites-available/000-default.conf\n\
apache2-foreground' > /entrypoint.sh \
&& chmod +x /entrypoint.sh

EXPOSE 10000

CMD ["/entrypoint.sh"]