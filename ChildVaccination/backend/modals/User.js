const mongoose=require('mongoose');
const {Schema}=mongoose;
const ChildSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    parent_name:{
        type:String,
        required:true
    },
    phone_num:{
        type:String,
        required:true
    },
    birth_date:{
        type:Date,
        required:true
    }

},{versionKey:false});
const myModel=mongoose.model("NEWCOL",ChildSchema)
module.exports=myModel;

// const mongoose=require('mongoose');
// const {Schema}=mongoose;

// const sch=new Schema({
//     name:String,
//     class:String,
//     section:String,
//     branch:String
// },{versionKey:false})
// const myModel=mongoose.model("NEWCOL",sch)
// module.exports=myModel;