IMAGE="benjithedalilama/alice-backend:MVP"

./hyper pull $IMAGE
./hyper compose down -p backend
./hyper compose up -p backend -f hyper-compose.yml -d
