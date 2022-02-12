var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_lixiaoyi',
  password        : '8102',
  database        : 'cs290_lixiaoyi'
});

module.exports.pool = pool;
