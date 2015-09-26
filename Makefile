deploy:
	./server/deploy.sh

dev:
	gulp build

prod:
	gulp build --prod
