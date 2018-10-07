IMAGE="benjithedalilama/alice-backend:MVP"

docker build . -t $IMAGE
docker login
docker push $IMAGE

hyper pull $IMAGE

hyper compose down -p backend
hyper compose up -p backend -f hyper-compose.yml
