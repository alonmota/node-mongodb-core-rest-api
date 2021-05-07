const { MongoClient } = require("mongodb");

const config = require('./config');
 
// Singleton for db connection
let DbConnection = function () {

  let db = null;
  async function DbConnect() {
    try {
      // Using mongodb uri sintax
      // eslint-disable-next-line max-len
      const uri = `mongodb://${config.mongo.user}:${config.mongo.password}@${config.mongo.ip}:${config.mongo.port}/${config.mongo.database}`;
      const clientProp = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const client = await clientProp.connect();
      let _db = client.db(config.mongo.database);

      return _db
    } catch (e) {
      return e;
    }
  }

  async function Get() {
    try {
      if (db != null) {
        return db;
      } else {
        db = await DbConnect();
        return db; 
      }
    } catch (e) {
      return e;
    }
  }

  return {
    Get: Get,
  }
}


module.exports = DbConnection();