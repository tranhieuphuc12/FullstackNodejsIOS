docker run -d --name mongo_container -p 27017:27017 mongo:6
docker run -d --name backend_container -p 3000:3000  tranhieuphuc12/my-journal-be:latest
docker run -d --name frontend_container -p 8080:8080 tranhieuphuc12/my-journal-fe:latest

docker pull tranhieuphuc12/my-journal-fe:latest
docker pull tranhieuphuc12/my-journal-be:latest
