FROM php:8.3-apache

WORKDIR /var/www/html

# System dependencies + Node.js 20
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    zip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache rewrite
RUN a2enmod rewrite

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application files
COPY . .

# Install PHP dependencies
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction

# Install Node dependencies and build assets
RUN npm ci
RUN npm run build

# Cache Laravel files for production
RUN php artisan config:cache || true
RUN php artisan route:cache || true
RUN php artisan view:cache || true

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Set Apache document root to Laravel public folder
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf

# Create startup script
RUN printf '#!/bin/bash\n\
set -e\n\
\n\
echo "Starting Laravel..."\n\
\n\
php artisan optimize:clear || true\n\
php artisan storage:link || true\n\
php artisan migrate --force || true\n\
\n\
if [ ! -z "$PORT" ]; then\n\
  sed -i "s/80/${PORT}/g" /etc/apache2/ports.conf\n\
  sed -i "s/:80/:${PORT}/g" /etc/apache2/sites-available/000-default.conf\n\
fi\n\
\n\
apache2-foreground\n' > /entrypoint.sh \
&& chmod +x /entrypoint.sh

EXPOSE 10000

CMD ["/entrypoint.sh"]