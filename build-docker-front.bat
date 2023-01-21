cd ./frontend/
docker build -t python-compiler-frontend .
docker run -p 8080:80 --rm python-compiler-frontend

