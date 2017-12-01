const mysql = require('mysql')
const obj = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
};

const pool = mysql.createPool(obj);

const sql = "SELECT id,name, email, tel FROM member";

const arr = [];

pool.getConnection((err, conn) => {
    if (err) { console.log('err=', err); return; }

    conn.query(sql, arr, (err, rows) => {
        if (err) { console.log('err=', err); return; }
        console.log('rows=', rows);
        conn.release();
    });
});