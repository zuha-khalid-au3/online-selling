const mongoose =require('mongoose');
//const {ObjectId}=mongoose.Schema;

const categorySchema= new mongoose.Schema(
    {
    name: {
        type:String,
        trim:true,
        required:'Name required',
        minLength:[3,'Too short'],
        maxLength:[3,'Too long'],
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true,
    },
    },
    {timestamp:true}
);
module.exports =mongoose.model("Category",categorySchema);



