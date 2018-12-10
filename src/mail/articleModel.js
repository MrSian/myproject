const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;
	// console.log(Schema);
  let comicSchema=new Schema({
    articletitle:{type:String,required:true},
    articletitle1:{type:String,required:true},
    articletitle2:{type:String,required:true},
    articletitle3:{type:String,required:true},
    articlesort:{type:String,required:true},
    keywords:{type:String,required:true},
    textarea:{type:String,required:true},
    author:{type:String,required:true},
    sources:{type:String,required:true},
    commentdatemin:{type:String,required:true},
    commentdatemax:{type:String,required:true},
    hot:{type:String}
  })
  // type 字段类型  required 是否必须
 let comicmodel=mongoose.model('article', comicSchema);
  //参数1  集合名字  参数2是 schema对象 将schema对象变成model
  module.exports=comicmodel;