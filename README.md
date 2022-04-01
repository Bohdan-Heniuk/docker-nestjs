To start:

1) docker build -f Dockerfile-app .
2) docker build -f Dockerfile-db .
2) npm start
3) NODE_ENV=development docker-compose exec api npx sequelize-cli db:migrate