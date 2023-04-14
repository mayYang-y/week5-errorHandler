const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path: "./config.env"});
// 環境變數存在 process.env
const DB = process.env.DATABASE
	.replace(
		'<password>',
		process.env.DATABASE_PASSWORD
	).replace(
		'<collection>',
		process.env.COLLECTION_NAME
	)

// 資料庫設定
mongoose.connect('mongodb://127.0.0.1:27017/post2')
// mongoose.connect(DB)
    .then(res=> console.log("連線資料成功"));