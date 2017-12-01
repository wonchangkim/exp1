var mysql = require('mysql');
// mysql 모듈을 가져오겠다.

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});
// 데이터베이스 연결

connection.connect();
// 연결
connection.query('SELECT 1 + 1 AS solution', (error, results) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});
// 작업
connection.end();
// 연결해제
// 연결 > 작업 > 연결해제