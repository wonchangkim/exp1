const mysql = require('mysql')
const obj = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
};

const pool = mysql.createPool(obj);

const sql = "insert into member(id,name,email,tel) values(?,?,?,?)";

const arr = ['hong', '홍길동', 'hong@aa.com', '010-1111-2222'];

pool.getConnection((err, conn) => {
    if (err) { console.log('err=', err); return; }

    conn.query(sql, arr, (err, row) => {
        if (err) { console.log('err=', err); return; }
        console.log('저장완료');
        conn.release();
    });
});