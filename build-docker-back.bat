cd ./backend/
docker build -t python-compiler-backend .
docker run  -p 5000:5000 --rm python-compiler-backend