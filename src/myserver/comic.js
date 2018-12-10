const express=require('express');
const Router=express.Router();

const comicModel=require('./comicModel.js');
const util=require('./livfc-util.js')

Router.post('/comiclist',(req,res)=>{
	//实现分页   总的数据    目标页   每页有x条
	//  console.log(req.body)
     let pagesize=Number(req.body.pagesize);
	 let target=Number(req.body.target);
	 let {name,time,city,type}=req.body;
	 let comic=null;
	 if(city!=''){
		comic={city:city}
	 }else if(type!=''){
		comic={type:type}
	 }else if(name!=''){
		comic={name:{$regex : name}}
	 }else{
		comic=null;
	 }
     let total=0
     comicModel.find(comic)
     .then((res)=>{
		total=res.length;
		if(city!=''){
			return comicModel.find({city:city}).sort({time:time}).limit(pagesize).skip((target-1)*pagesize)
		}else if(type!=''){
			return comicModel.find({type:type}).sort({time:time}).limit(pagesize).skip((target-1)*pagesize)
		}
		else if(name!=''){
			return comicModel.find({name:{$regex : name}}).sort({time:time}).limit(pagesize).skip((target-1)*pagesize)
		}
		else{
			return comicModel.find().sort({time:time}).limit(pagesize).skip((target-1)*pagesize)
		} 
     })
	.then((data)=>{
	   let array={total:total,comiclist:data}
	//    console.log(array)
	 res.send(util.sendData(0,'请求ok',array))
	})
	.catch((err)=>{
		console.log(err)
		res.send(util.sendData(-1,'请求错误',null))
	})
	
})

//添加动漫信息
Router.post('/addcomic',(req,res)=>{
	let {name,img,city,type,labels,time}=req.body;
	// console.log({name,img,type,labels,time});
	comicModel.insertMany({name,img,city,type,labels,time})
	.then((data)=>{
	 res.send(util.sendData(0,'添加动漫信息成功！',data))
	})
	.catch((err)=>{
		// console.log(err);
		res.send(util.sendData(-1,'添加动漫信息失败！',null))
	})
})
//修改动漫信息
Router.post('/editcomic',(req,res)=>{
	let {id,name,city,img,type,labels,time}=req.body;
	 comicModel.updateMany({_id:id},{name,img,city,type,labels,time})
	.then((data)=>{
	 res.send(util.sendData(0,'修改动漫信息成功！',data))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'修改动漫信息失败！',null))
	})
})
//删除某一动漫信息
Router.post('/delcomic',(req,res)=>{

	let id=req.body.id; 
	if (!id) {res.send(util.sendData(-1,'参数错误',null))}
	comicModel.deleteOne({_id:id})
	.then((data)=>{
	 res.send(util.sendData(0,'删除成功',data))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'删除失败',null))
	})
})
//分类查询
Router.post('/comicByType',(req,res)=>{

	let type=req.body.type 
	if (!type) {res.send(util.sendData(-1,'参数错误',null))}
	comicModel.find({type:type})
	.then((data)=>{
	 res.send(util.sendData(0,'查询ok',data))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'查询失败',null))
	})
})
Router.post('/getcomicById',(req,res)=>{

	let id=req.body.id 
	let name=req.body.name
	if(id!=null){
		if (!id) {res.send(util.sendData(-1,'参数错误',null))}
		comicModel.find({_id:id})
		.then((data)=>{
		 res.send(util.sendData(0,'查询ok',data))
		})
		.catch((err)=>{
			res.send(util.sendData(-1,'查询失败',null))
		})
	}else{
		if (!name) {res.send(util.sendData(-1,'参数错误',null))}
		comicModel.find({name:name})
		.then((data)=>{
		 res.send(util.sendData(0,'查询ok',data))
		})
		.catch((err)=>{
			res.send(util.sendData(-1,'查询失败',null))
		})
	}

})
module.exports=Router;