deploy:
	./server/deploy.sh

dev:
	gulp build

prod:
	ENVIRONMENT=prod gulp build
