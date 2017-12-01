const mysql = require('mysql')
const obj = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
};

const pool = mysql.createPool(obj);

const sql = "DELETE FROM member WHERE id=?";

const arr = ['hong'];

pool.getConnection((err, conn) => {
    if (err) { console.log('err=', err); return; }

    conn.query(sql, arr, (err, row) => {
        if (err) { console.log('err=', err); return; }
        console.log('삭제완료');
        conn.release();
    });
});