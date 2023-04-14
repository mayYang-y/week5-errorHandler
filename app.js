const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
// const axios = require("axios");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

// 資料庫連線設定
require('./connections');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


// 路由第一層設定在此：
// 例：如果進入 "/users"，就會往 usersRouter(./routes/users) 檔案裡面找下一層子路徑
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);


// 404 錯誤
app.use(function(req,res,next){
    res.status(404).json({
        status:"false",
        message:"您的路由不存在"
    })
})

// express 錯誤處理
// dev 錯誤處理
const resErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        message: err.message,
        error: err,
        stack: err.stack,
    });
}
// prod 錯誤處理 (隱藏部分機密資料)
const resErrorProd = (err, res) => {
    if (err.isOperational){
        res.status(err.statusCode).json({
            "message": err.message
        })
    }else {
        // log 紀錄
        console.error("出現重大錯誤", err);
        res.status(500).json({
            status: "error",
            message: "系統錯誤，請恰系統管理員",
        });
    }
}
app.use(function(err,req,res,next){
    // dev
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === 'dev'){
        return resErrorDev(err, res);
    }

    // production
    if (err.name === "ValidationError"){
        err.message = "資料欄位未填寫正確，請重新輸入！"
        err.isOperational = true;
        return resErrorProd(err, res);
    }
    return resErrorProd(err, res)
})

process.on('uncaughtException', err => {
    // 記錄錯誤下來，等到服務都處理完後，停掉該 process，通常用於紀錄 LOG
    console.error('Uncaughted Exception！')
    console.error("err-name", err.name);
    console.error("err-message", err.message);
    console.error("err-stack", err.stack);
    process.exit(1);
});
// console.log(a); // 測試 uncaughtException

/** 
axios.get("https://www.googlefake.com.tw") // 連接到假的網址，測試 unhandledRejection 錯誤
.then(res => console.log(res))
.catch(err => { // 如果沒有寫 catch 就會被 process.on('unhandledRejection',...) 捕捉到
    console.log(err.message);
    console.log(err.name);
    console.log(err.stack);
})
 */
// 未捕捉到的 catch 
process.on('unhandledRejection', (reason, promise) => {
    console.error('未捕捉到的 rejection：', promise, '原因：', reason);
    // 記錄於 log 上
  });

module.exports = app;
