'use strict'
const http =require('http');
const request=require('request');
const url=require('url');
const express=require('express');
const proxy = require("http-proxy-middleware");
const bodyParser=require('body-parser');
const path=require('path');
let app=express();

// 用户模块
const user=require('./user.js');
// 信息模块
const comic=require('./comic.js');
// 连接数据库
const db=require('./dbconnect.js');

//post参数解析 get解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/user',user);
app.use('/api/comic',comic);


app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	
	// 跨域请求CORS中的预请求
	if (req.method == "OPTIONS"){
		res.send(200); //让options请求快速返回
	}
	else{
		next();
	} 
});

var options={
    "target": "http://app.lifevc.com",
    "changeOrigin": true,
    "pathRewrite": {
      "^/proxy" : "/",
	}
};
var exampleProxy=proxy(options);
app.use('/proxy',exampleProxy)


// 设置代理
app.use("/lifevone",proxy({
	"target": "http://app.lifevc.com",
    "changeOrigin": true,
    "pathRewrite": {
      "^/lifevone" : "/"
	}
}));
app.use("/lifevtwo",proxy({
    "target": "http://app.lifevc.com",
    "changeOrigin": true,
    "pathRewrite": {
      "^/lifevtwo" : "/"
    }
}));
app.use("/lifevthere",proxy({
    "target": "http://newapi.lifevc.com/",
    "changeOrigin": true,
    "pathRewrite": {
      "^/lifevthere" : "/"
    }
}));

app.listen(8000,()=>{
    console.log('livfc-家居后台服务器连接成功!');
})