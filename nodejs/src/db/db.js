const mysql = require("mysql");
const { BadRequestError, NotFoundError } = require('../utils/api-errors');




const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'taxmanager'
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Mysql: Connected');
});
db.promise = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        reject(new Error());
      } else {
        resolve(result);
      }
    });
  });
};




module.exports = db;
