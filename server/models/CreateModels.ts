import mongoose,{Document,Schema,Model} from "mongoose";

interface Iuser extends Document{
    userId:String;
    name:String;
    email:String;
    age:String;
}
const userSchema:Schema<Iuser>=new mongoose.Schema(
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

const  user:Model<Iuser>=mongoose.model("crud",userSchema);

// module.exports=user;

export default user;
