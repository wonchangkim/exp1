var express = require('express');
var router = express.Router();

const mysql = require('mysql')

const obj = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
};

const pool = mysql.createPool(obj);

/* http://localhost:3000/ */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* http://localhost:3000/writeform */
router.get('/writeform', (req, res, next) => {
    res.render('writeform', { title: '게시판 글 쓰기' });
});
// next 오류가 발생했을시 서버가 안 죽음

/* http://localhost:3000/write : post 방식 body에 받는다.*/
router.post('/write', (req, res, next) => {
    console.log('req.body=', req.body);
    const writer = req.body.writer;
    const pwd = req.body.pwd;
    const subject = req.body.subject;
    const content = req.body.content;

    const sql = "insert into board(writer,pwd,subject,content) values(?,?,?,?)";
    const arr = [writer, pwd, subject, content];
    pool.getConnection((err, conn) => {
        if (err) { return next(err) }
        conn.query(sql, arr, (err, row) => {
            if (err) { return next(err) }
            console.log('저장완료');
            conn.release();
            res.send('ok');
        });
    });
});

/* http://localhost:3000/list : get 방식*/
router.get('/list', (req, res, next) => {
    // res.send("여기는 list 입니다.");
    pool.getConnection((err, conn) => {
        if (err) { return next(err) }
        const sql =
            `SELECT num, 
             subject, 
             writer, 
             DATE_FORMAT(regdate,'%Y-%c-%d-%T') as regdate, 
             hit 
             FROM board ORDER BY num DESC`
        const arr = [];
        conn.query(sql, arr, (err, rows) => {
            console.log('rows=', rows);
            conn.release(); //머그잔 반납
            var obj = { "title": "게시판 리스트", "rows": rows };
            // res.json(obj); 모바일 서버 
            res.render('list', obj); //웹서버
        });
    });
});

router.get('/read/:num', (req, res, next) => {
    let num = req.params.num; //num 받는 방식 약속
    console.log('num=', num);
    pool.getConnection((err, conn) => {
        if (err) { return next(err) }
        let update_sql = "update board set hit = hit + 1 where num=?"; //조회수 업데이트
        let arr = [num];
        conn.query(update_sql, arr, (err, result) => {
            if (err) { return next(err) }
            console.log('result=', result);

            let sql = "SELECT * FROM board WHERE num=?";

            conn.query(sql, arr, (err, rows) => {
                if (err) { return next(err) }
                console.log('rows=', rows);
                conn.release();
                let obj = {
                    title: "게시판 글 읽기",
                    row: rows[0]
                };
                res.render('read', obj)
            });
        });


    });
});

router.get('/updateform/:num', (req, res, next) => {
    let num = req.params.num;
    //1.db에서 셀텍트하고 보여주기.
    pool.getConnection((err, conn) => {
        if (err) { return next(err) }
        let sql = "select * from board where num=?";
        let arr = [num];
        conn.query(sql, arr, (err, rows) => {
            if (err) { return next(err) }
            console.log('rows=', rows);
            conn.release();
            let obj = {
                title: "게시판수정",
                row: rows[0]
            };
            res.render('updateform', obj);
        });
    });
});
module.exports = router;

// CREATE TABLE `board` (
//         `num` int(11) NOT NULL AUTO_INCREMENT,
//         `pwd` varchar(20) NOT NULL,
//         `subject` varchar(100) NOT NULL,
//         `content` text NOT NULL,
//         `writer` varchar(20) NOT NULL,
//         `regdate` datetime NOT NULL DEFAULT current_timestamp(),
//         `hit` int(11) NOT NULL DEFAULT 0,
//         PRIMARY KEY(`num`)