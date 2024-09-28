const mongoose=require("mongoose");
const userSchema=mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        age:{
            type:Number,
            required:true,
        }
    },
    {
        timestamps:true,
    }
);

const  user=mongoose.model("crud",userSchema);

module.exports=user;


