let dbConfig = {};

dbConfig.mongoURI = {
  //development db
  development:
    "mongodb://web-api:web-api-2019@ds249623.mlab.com:49623/orders-pizza-db",
  //testing db
  test:
    "mongodb://web-api:web-api-2019@ds249623.mlab.com:49623/orders-pizza-db-test"
};

module.exports = dbConfig;
