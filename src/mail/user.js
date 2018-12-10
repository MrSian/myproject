const express=require('express');
const Router=express.Router();
const mail=require('./send_mail.js');
const userModel=require('./userModel.js');
// imomoe-utli返回数据
const util=require('./imomoe-utli.js');

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

// console.log(mail.sendmail('1719098864@qq.com',123));
Router.post('/getmail',(req,res)=>{
	console.log(req.body);
	let {email}=req.body;
	if (!email||email=="") {return res.send(util.sendData(-1,'参数错误',null))}
	let num1 = "";
	for (var i = 0; i < 6; i++) {
		num1 += Math.floor(Math.random() * 10)
	}
	mail.sendmail(email,num1)
	.then((resolve)=>{
		let emails={
			num1:num1,
			true:'验证码已成功发送!',
			number:0
		}
		//保存验证码信息
		// console.log(num1);
		res.send(emails);
	})
	.catch((err)=>{
		let emails={
			num1:null,
			true:'验证码发送失败!',
			number:-1
		}
		res.send(emails)
	})
	
})
module.exports=Router;