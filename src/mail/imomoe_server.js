const express=require('express');
const app=express();
const bodyParser=require('body-parser')
const path=require('path')

// 己方模块
const user=require('./user.js');
const db=require('./dbconnect.js');
const comic=require('./comic.js');
const upload=require('./imomoe-upload.js');
const article=require('./article.js');

//post参数解析 get解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/user',user);
app.use('/api/comic',comic);
app.use('/api/upload',upload);
app.use('/api/article',article);

app.use(express.static(path.join(__dirname,'../img'))) //图片静态文件
app.use('/admin',express.static(path.join(__dirname,'../'))) //页面静态文件

app.listen(8000,()=>{
    console.log('樱花后台服务器连接成功!');
})