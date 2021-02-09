# oboco-frontend

the frontend of [oboco](https://gitlab.com/jeeto/oboco) (work in progress).

## angular

### requirements

- nodejs
- npm
- angular
	- npm install -g @angular/cli

## configuration

- src/environments/environment.ts
	- baseUrl: the base url of oboco-backend

### build

- npm install
- ng build

### run

- ng serve --port 9080

### test

- http://127.0.0.1:9080/

## docker

### requirements

- docker

### build

- docker build -f Dockerfile -t oboco-frontend/2.0.0 .

### run

- start
	- docker run -e TZ=Europe/Brussels -e BASE_URL=http://127.0.0.1:8080 -i --rm -p 9080:9080 --name oboco-frontend oboco-frontend/2.0.0
		- "-e TZ=Europe/Brussels": the timezone
		- "-e BASE_URL=http://127.0.0.1:8080": the base url of oboco-backend
- stop
	- docker stop oboco-frontend

### test

- http://127.0.0.1:9080/

### registry

you can use the latest docker image:
- registry.gitlab.com/jeeto/oboco-frontend/oboco-frontend:latest

### development

- push docker image
	- docker login registry.gitlab.com -u jeeto -p <token>
	- docker build -f Dockerfile -t registry.gitlab.com/jeeto/oboco-frontend/oboco-frontend:latest .
	- docker push registry.gitlab.com/jeeto/oboco-frontend/oboco-frontend:latest

## license

mit license