# Start with a base image
FROM php:8.1.0-apache

# Install system dependencies
RUN apt-get update -y && apt-get install -y openssl zip unzip git libonig-dev
# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# Install PHP extensions
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install exif
RUN docker-php-ext-install pcntl
RUN docker-php-ext-install bcmath
RUN docker-php-ext-install mbstring

# Set working directory
WORKDIR /app/backend

# Copy application files
COPY . .

RUN composer install

# Expose a port (if needed)
EXPOSE 8000

# Start the application
CMD php artisan serve --host=0.0.0.0

