deploy:
	gulp build --prod
	rsync -r ./public_prod root@florianec:/var/www/florian.ec/public_prod

dev:
	gulp build

prod:
	gulp build --prod
