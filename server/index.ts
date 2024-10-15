import dotenv from 'dotenv';
import express,{Request,Response,NextFunction} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import admin from 'firebase-admin';
import User from './models/CreateModels';

// import * as serviceAccount from './config/crud-85b26-firebase-adminsdk-m2f2j-bbb4b3bd72';

dotenv.config();
admin.initializeApp({
    credential: admin.credential.cert('./config/crud-85b26-firebase-adminsdk-m2f2j-bbb4b3bd72.json'),
});

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

const verifytoken=async (req:Request,res:Response,next:NextFunction)=>{
    const authHeader=req.headers.authorization
    if (!authHeader) {
       res.status(401).json({ message: "Authorization header missing" });
       return;
    }
    // console.log("request header",req.headers)
    const tokenParts = authHeader.split(" ");
    if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
         res.status(401).json({ message: "Malformed authorization header" });
         return;
    }
    const token = tokenParts[1];
    console.log("received :"+token)
    
    if(!token){
        res.status(401).json({message:'no token provided'});
        return;
    }
    try{
    const decodedToken=await admin.auth().verifyIdToken(token);
    (req as any).userId=decodedToken.uid;
    console.log(decodedToken.uid+"<<------->>"+(req as any).userId);
    next();
    }
    catch(err){
        console.error("err"+err);
        res.status(401).json({message:'invalid token'})
    }
};

app.post('/createUser',verifytoken,async(req:Request,res:Response)=>{
    try{
        console.log("Step 1 ------------>")
        console.log((req as any).userId)
        const user=await User.create({...req.body,userId:(req as any).userId});
        console.log("Step 2 ------------>");
        res.status(200).json({user});
        console.log("Step 3 ------------>",{user});

    }
    catch(err){
        console.log("inside the error step 1 ------------->");
        console.log('error')
        console.error( "Error:",(err as any).response ? (err as any).response.data : (err as any).message );
        console.log("inside the error step 2 ------------->");
        res.status(500).json({message:(err as any).message});
    }

})

app.put("/updateUser/:id", verifytoken, async (req:Request, res:Response) => {
    try {
      const { id } = req.params;
      const user = await User.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id), userId: (req as any).userId },
        { name: req.body.name, email: req.body.email, age: req.body.age },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: `user is not avilable by ${id}` });
        return;
      }
      console.log("updated..");
      res.status(200).json({ user });
    } catch (err) {
      console.error("err" + err);
      res.status(500).json({ message: (err as any).message });
    }
  });

  app.delete("/deleteUser/:id", verifytoken, async (req:Request, res:Response)=> {
    try {
      const { id } = req.params;
      const user = await User.findOneAndDelete(
        { _id: new mongoose.Types.ObjectId(id), userId: (req as any).userId },
        // req.body,
        // { new: true }
      );
      if (!user) {
        res.status(404).json({ message: `the user cant delete by ${id}` });
        return ;
      }
      console.log("deleted..");
      res.status(200).json({ user });
    } catch (err) {
      console.error("erros" + err);
      res.status(500).json({ message: (err as any).message });
    }
  });

  app.get("/", verifytoken, async (req:Request, res:Response) => {
    try {
      const user = await User.find({});
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ message: (err as any).message });
    }
  });

  app.get("/me", verifytoken, async (req:Request, res:Response) => {
    try {
      console.log("vaaa");
      const user = await User.find({ userId: (req as any).userId });
      // if (!user.length) {
      //   return res.status(404).json({ message: "the user is not found" });
      // }
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ message: (err as any).message });
    }
  });

  app.get("/:id", verifytoken, async (req:Request, res:Response)=> {
    try {
      console.log("innnnnn");
      const { id } = req.params;
      const user = await User.findById(
        { _id: new mongoose.Types.ObjectId(id), userId: (req as any).userId },
        req.body,
        { new: true }
      );
      // const user=await User.findOne({_id:new mongoose.Types.ObjectId(id),userId:req.userId},{new:true})

      // if (!user) {
      //   return res.status(404).json(`the user is not in DB by ${id}`);
      // }
      console.log("found");
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ message: (err as any).message });
      console.log("cant");
    }
  });



const mongo_URI="mongodb+srv://mohanasundaramg:MBNFmHAHTGF9rN1l@temp-pro-db.2pnmi.mongodb.net/Node-API?retryWrites=true&w=majority&appName=temp-pro-db"

mongoose.connect(mongo_URI).then(()=>{
    console.log("db connected");
}).catch((e)=>{
    console.log("cant connect db");
})

app.listen(3000,()=>{
    console.log("server is listening on http://localhost:3000");
})