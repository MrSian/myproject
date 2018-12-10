const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true });
//链接数据库
let db = mongoose.connection;
//创建数据库对象
db.on('error',()=>{ console.log ('connection error:')})
//监听数据库链接错误
db.on('open', function() {
  console.log("樱花后台数据库连接成功!")
});
 db.on('disconnected', function () {
     console.log('数据库连接断开');
 })


 

