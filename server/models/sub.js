const mongoose =require('mongoose');
const {ObjectId}=mongoose.Schema;

const subSchema= new mongoose.Schema(
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
    parent:{ type:ObjectId,
    ref:"Category", required:true },
    },
    {timestamp:true}
);
module.exports =mongoose.model("Sub",subSchema);



