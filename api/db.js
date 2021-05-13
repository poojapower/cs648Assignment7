const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;
const url = process.env.DB_URL || 'mongodb+srv://dbUser:dbUser@cluster0.s1tfm.mongodb.net/Assignment4';

async function connectToDb() {
  const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await mongoClient.connect();
  console.log('Connected MongoDB at', url);
  db = mongoClient.db();
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getNextSequence, getDb };
