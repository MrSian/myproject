const express=require('express');
const Router=express.Router();
const userModel=require('./userModel.js');
// imomoe-utli返回数据
const util=require('./livfc-util.js');

let obj={};
// 登录
Router.post('/login',(req,res)=>{
	let {us,pass}=req.body
	userModel.find( {us,pass})
	.then((data)=>{
	   if (data.length>=1) { 
		   return res.send(util.sendData(0,'登录成功',null));
		}
		res.send(util.sendData(-1,'登录成功',null));
	})
	
})
// 注册
Router.post('/reg',(req,res)=>{
	let user=req.body.uname;
	var arr = user.split('@');
	let us=arr[0];
	// console.log(typeof(us));
	let pass=req.body.pwd;
	// console.log(req.body);
	// if (obj[us]!==code) { return res.send(util.sendData(-1,'验证码错误',null) )}
	userModel.insertMany({us,pass})
	.then((data)=>{
		res.send(util.sendData(0,'注册ok 请登录',null))
	})
	.catch((err)=>{
		// console.log(err)
		res.send(util.sendData(-1,'注册失败',null))
	})
	
})
module.exports=Router;