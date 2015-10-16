deploy:
	ssh root@florianec '/var/www/florian.ec/server/deploy.sh'

dev:
	gulp build

prod:
	gulp build --prod
