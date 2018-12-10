const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;
	// console.log(Schema);
  let comicSchema=new Schema({
  	name:{type:String,required:true},
    img:{type:String,required:true},
    city:{type:String,required:true},
  	type:{type:String,required:true},
  	labels:{type:String,required:true},
  	time:{type:String,required:true},
	hot:{type:String},
	createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
  })
  // type 字段类型  required 是否必须
 let comicmodel=mongoose.model('comica', comicSchema);
  //参数1  集合名字  参数2是 schema对象 将schema对象变成model
  module.exports=comicmodel;
