const mysql = require('mysql')
const obj = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
};

const pool = mysql.createPool(obj);

const sql = "update member set name=?, email=?, tel=? where id=?";

const arr = ['홍길순', 'sun@aa.com', '010-1121-112', 'hong'];

pool.getConnection((err, conn) => {
    if (err) { console.log('err=', err); return; }

    conn.query(sql, arr, (err, row) => {
        if (err) { console.log('err=', err); return; }
        console.log('저장완료');
        conn.release();
    });
});