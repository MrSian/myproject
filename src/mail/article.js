const express=require('express');
const Router=express.Router();

const articleModel=require('./articleModel.js');
const mail=require('./send_mail.js')
const util=require('./imomoe-utli.js')

Router.post('/articlelist',(req,res)=>{
	//实现分页   总的数据    目标页   每页有3条
	//  console.log(req.body)
     let pagesize=Number(req.body.pagesize);
     let target=Number(req.body.target)
     let total=0
     articleModel.find()
     .then((res)=>{
        total=res.length
       return articleModel.find().limit(pagesize).skip((target-1)*pagesize)
     })
	.then((data)=>{
       let array={total:total,articlelist:data}
	 res.send(util.sendData(0,'请求ok',array))
	})
	.catch((err)=>{
		console.log(err)
		res.send(util.sendData(-1,'请求错误',null))
	})
	
})
//添加动漫信息
Router.post('/addarticle',(req,res)=>{
    let {articletitle,articletitle1,articletitle2,articletitle3,articlesort,keywords,textarea,author,sources,commentdatemin,commentdatemax}=req.body;
    
	articleModel.insertMany({articletitle,articletitle1,articletitle2,articletitle3,articlesort,keywords,textarea,author,sources,commentdatemin,commentdatemax})
	.then((data)=>{
	 res.send(util.sendData(0,'添加咨询信息成功！',data))
	})
	.catch((err)=>{
		console.log(err);
		res.send(util.sendData(-1,'添加咨询信息失败！',null))
	})
})
//修改咨询信息
Router.post('/editarticle',(req,res)=>{
	let {id,articletitle,articletitle1,articletitle2,articletitle3,articlesort,keywords,textarea,author,sources,commentdatemin,commentdatemax}=req.body;
	 articleModel.updateMany({_id:id},{articletitle,articletitle1,articletitle2,articletitle3,articlesort,keywords,textarea,author,sources,commentdatemin,commentdatemax})
	.then((data)=>{
	 res.send(util.sendData(0,'修改咨询信息成功！',data))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'修改咨询信息失败！',null))
	})
})
//删除某一咨询信息
Router.post('/delarticle',(req,res)=>{

	let id=req.body.id; 
	if (!id) {res.send(util.sendData(-1,'参数错误',null))}
	articleModel.deleteOne({_id:id})
	.then((data)=>{
	 res.send(util.sendData(0,'删除成功',data))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'删除失败',null))
	})
})
//分类查询
Router.post('/articleByType',(req,res)=>{

	let type=req.body.type 
	if (!type) {res.send(util.sendData(-1,'参数错误',null))}
	articleModel.find({type:type})
	.then((data)=>{
	 res.send(util.sendData(0,'查询ok',data))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'查询失败',null))
	})
})
Router.post('/getarticleById',(req,res)=>{

	let id=req.body.id 
	let name=req.body.name
	if(id!=null){
		// console.log(id);
		if (!id) {res.send(util.sendData(-1,'参数错误',null))}
		articleModel.find({_id:id})
		.then((data)=>{
		 res.send(util.sendData(0,'查询ok',data))
		})
		.catch((err)=>{
			res.send(util.sendData(-1,'查询失败',null))
		})
	}else{
		if (!name) {res.send(util.sendData(-1,'参数错误',null))}
		articleModel.find({name:name})
		.then((data)=>{
		 res.send(util.sendData(0,'查询ok',data))
		})
		.catch((err)=>{
			res.send(util.sendData(-1,'查询失败',null))
		})
	}

})
module.exports=Router;