cd /var/www/html/backend

a2enmod rewrite
composer update composer install 
php artisan migrate 
php artisan db:seed 
php artisan key:generate
php artisan passport:install --uuids
php artisan migrate --env=testing --force
php artisan passport:install --env=testing --force
chmod -R a+w /var/www/html/storage/

echo "Starting PHP FPM server"
cd /var/www/html/backend
php-fpm