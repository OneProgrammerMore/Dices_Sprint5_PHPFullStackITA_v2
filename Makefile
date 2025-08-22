start-dev:
	docker-compose -f docker-compose.yml up --force-recreate
stop-dev:
	docker-compose -f docker-compose.yml down
build-deploy:
	docker-compose -f docker-compose.build.yml up --force-recreate
start-deploy: 
	docker-compose -f docker-compose.deploy.yml up -d --force-recreate
stop-deploy:
	docker-compose -f docker-compose.deploy.yml down
db-set-rights:
	chown -R 999:999 ./docker/dice-mariadb
delete-dbs:
	rm -R ./docker/dice-mariadb
delete-deps:
	# For Laravel
	rm -R ./cup-web/vendor
	rm -R ./cup-web/node-modules
delete-build:
	rm -R ./cup-web/public/build
priv-dev:
	chmod u+x ./scripts/privileges-development.sh && ./scripts/privileges-development.sh
priv-deploy:
	chmod u+x ./scripts/privileges-deploy.sh && ./scripts/privileges-deploy.sh
react-build:
	docker-compose -f docker-compose.react.yml up --force-recreate
laravel-config:
	docker exec -it dice-laravel npm run build
	docker exec -it dice-laravel php artisan config:clear
	docker exec -it dice-laravel php artisan config:cache
	docker exec -it dice-laravel php artisan view:clear
	docker exec -it dice-laravel php artisan view:cache
	docker exec -it dice-laravel php artisan route:clear
	docker exec -it dice-laravel php artisan cache:clear
laravel-docu:
	docker exec -it dice-laravel php artisan l5-swagger:generate

