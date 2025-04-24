const mysql = require('mysql2');
require('dotenv').config();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(dbConfig);

const connectWithRetry = async () => {
  for (let i = 0; i < 20; i++) { // Retry 20 times
    try {
      await new Promise((resolve, reject) => {
        connection.connect((err) => {
          if (err) {
            reject(err);
            return;
          }
          console.log('Connected to the database as id', connection.threadId);
          resolve();
        });
      });
      return;
    } catch (err) {
      console.error('Error connecting to the database:', err.message);
      if (i === 19) { // Last retry
        console.error('Failed to connect to the database after 20 attempts');
        process.exit(1);
      }
      console.log(`Retrying connection (${i + 1}/20)...`);
      await delay(10000); // Wait 10 seconds before retrying
    }
  }
};

connectWithRetry();

module.exports = connection.promise();