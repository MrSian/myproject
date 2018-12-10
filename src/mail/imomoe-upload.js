const multer=require('multer')
const express=require('express');
const Router=express.Router();
const fs=require('fs');
const path=require("path")
let upload = multer({ dest: 'tmp/' })//设置图片保存的临时路径


Router.post('/img',upload.single('test'),(req,res)=>{
  
//   console.log(req.file)
  //尺寸限制
  // 类型限制
  fs.readFile(req.file.path,(err,data)=>{
  	if (err) { return res.send("上传错误")}
  	let  filename=new Date().getTime()+parseInt(Math.random(0,1)*1000)+"."+req.file.mimetype.split('/')[1]
    // console.log(filename)
  	fs.writeFile(path.join(__dirname,'../img',filename), data,(err)=>{
  		if (err) return res.send("上传错误")
  		let array={
  			err:0,
  			msg:'ok',
  			path:'img/'+filename
  		}
  		res.send(array)
  	});
  })
})




module.exports=Router;