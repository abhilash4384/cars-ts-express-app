import { Db, MongoClient } from 'mongodb';

let db: null | Db = null;
(async () => {
  try {
    console.log('connection string = ', process.env.DB_CONNECTION_STRING);
    const client = await MongoClient.connect(
      process.env.DB_CONNECTION_STRING ?? ''
    );
    db = client.db();
    console.log('connected to db🗄️');
  } catch (e) {
    console.log('Database Connection Error!', e);
  }
})();

export default db;
