    require("dotenv").config();
    const express=require("express")
    const mongoose=require("mongoose")
    const cors=require("cors")
    const app=express()
    const User=require('./models/CreateModel');
    const admin=require('firebase-admin');
    // const { auth } = require("../client/src/firebase");
    const serviceAccount=require('./config/crud-85b26-firebase-adminsdk-m2f2j-bbb4b3bd72.json');
    // const user = require("./models/CreateModel");
    // const corsAnywhere = require("cors-anywhere");

    // Serve your API on /proxy route
    // app.use("/proxy", (req, res) => {
    //   corsAnywhere.createServer({
    //     originWhitelist: [], // Allow all origins
    //     requireHeader: ["origin", "x-requested-with"],
    //     removeHeaders: ["cookie", "cookie2"],
    //   })(req, res);
    // });


    //INTIALLIZE THE FIREBASE APP

    admin.initializeApp({
        credential:admin.credential.cert(serviceAccount),
    });

    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    // const corsOptions = {
    //   origin: ("*"), // Allow all origins for now, but restrict this in production
    //   methods: ["GET", "POST", "PUT", "DELETE"],
    //   allowedHeaders: ["Authorization", "Content-Type"],
    //   exposedHeaders: ["Referrer-Policy"],
    //   credentials: true,
    // };
    // 
    
    app.use(cors());
    // app.use(cors({ origin: "https://yourdomain.com" }));
    // app.use(cors(corsOptions));
    // app.use((err,req, res, next) => {
    //   res.setHeader("Referrer-Policy", "no-referrer");
    //   console.error(err.stack);
    //   res.status(500).send("Something broke!");
    //   next();
    // });

    //MIDDLEWARE FOR VERIFY THE FIREBASE TOKEN

    const verifytoken=async (req,res,next)=>{
        const authHeader=req.headers.authorization
        if (!authHeader) {
          return res.status(401).json({ message: "Authorization header missing" });
        }
        // console.log("request header",req.headers)
        const tokenParts = authHeader.split(" ");
        if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
            return res.status(401).json({ message: "Malformed authorization header" });
        }
        const token = tokenParts[1];
        console.log("received :"+token)
        
        if(!token){
            return res.status(401).json({message:'no token provided'});
        }
        try{
        const decodedToken=await admin.auth().verifyIdToken(token)
        req.userId=decodedToken.uid;
        console.log(decodedToken.uid+"<<------->>"+req.userId)
        next();
        }
        catch(err){
            console.error("err"+err);
            res.status(401).json({message:'invalid token'})
        }
    };
    
    // const verifytoken = async (req, res, next) => {
    //   // Get the authorization header
    //   const authHeader = req.headers.authorization;
    //   console.log("Request headers:", req.headers);

    //   // Check if the token is provided in the Authorization header
    //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //     return res.status(401).json({ message: "No token provided" });
    //   }

    //   // Extract the token by removing the 'Bearer ' prefix
    //   const token = authHeader.split(" ")[1];
    //   console.log("Received token:", token);

    //   try {
    //     // Verify the token using Firebase Admin SDK
    //     const decodedToken = await admin.auth().verifyIdToken(token);
    //     req.userId = decodedToken.uid;
    //     console.log(`${decodedToken.uid} <<------->> ${req.userId}`);

    //     // Proceed to the next middleware or route handler
    //     next();
    //   } catch (err) {
    //     console.error("Error verifying token:", err);
    //     res.status(401).json({ message: "Invalid token" });
    //   }
    // };




// // idToken comes from the client app
// getAuth()
//   .verifyIdToken(idToken)
//   .then((decodedToken) => {
//     const uid = decodedToken.uid;
//     // ...
//   })
//   .catch((error) => {
//     // Handle error
//   });

    app.post('/createUser',verifytoken,async(req,res)=>{
        try{
            console.log("Step 1 ------------>")
            console.log(req.userId)
            const user=await User.create({...req.body,userId:req.userId});
            console.log("Step 2 ------------>");
            res.status(200).json({user});
            console.log("Step 3 ------------>",{user});

        }
        catch(err){
            console.log("inside the error step 1 ------------->");
            console.log('error')
            console.error( "Error:",err.response ? err.response.data : err.message );
            console.log("inside the error step 2 ------------->");
            res.status(500).json({message:err.message});
        }

    })


    app.put('/updateUser/:id',verifytoken,async(req,res)=>{
        try{
            const {id}=req.params;
        const user=await User.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id),userId:req.userId},{name:req.body.name,email:req.body.email,age:req.body.age},{new:true})
        if(!user){
            return res.status(404).json({message:`user is not avilable by ${id}`})
        }
        console.log("updated..")
        res.status(200).json({user})
            
        }
        catch(err){
        console.error("err"+err)
        res.status(500).json({message:err.message})
        }
    })

    app.delete('/deleteUser/:id',verifytoken,async(req,res)=>{
        try {
        const { id } = req.params;
        const user = await User.findOneAndDelete({_id:new mongoose.Types.ObjectId(id),userId:req.userId}, req.body,{new:true});
        if (!user) {
            return res.status(404).json({ message: `the user cant delete by ${id}` });
        }
        console.log("deleted..")
        res.status(200).json({user})
        } 
        catch(err) {
            console.error("erros"+err)
            res.status(500).json({message:err.message})
        }
    })

    app.get('/',verifytoken,async(req,res)=>{
        try{
            const user=await User.find({})
            res.status(200).json({user})
        }
        catch(err){
            res.status(500).json({message:err.message})
        }
    })

    app.get('/me',verifytoken,async(req,res)=>{
        try{
        const user=await User.find({userId:req.userId})
        if(!user.length){
           return res.status(404).json({message:'the user is not found'})
        }
        res.status(200).json({user})
        
        } 
        catch(err){
            res.status(500).json({message:err.message})
        }
    })

    app.get('/:id',verifytoken,async(req,res)=>{
        try{
        const {id}=req.params
        const user=await User.findById({_id:mongoose.Types.ObjectId(id),userId:req.userId},req.body,{new:true})
        if(!user){
            return res.status(404).json(`the user is not in DB by ${id}`)
        }
        console.log("found")
        res.status(200).json({user})
        }
        catch(err){
            res.status(500).json({message:err.message})
        }
    })
    // const MONGO_URI=process.env.MONGO_URI
    // console.log(MONGO_URI)

     const mongoURI =
       "mongodb://mohanasundaramg:MBNFmHAHTGF9rN1l@db:27017/Node-API?authSource=admin";
   
    //  "mongodb://mohanasundaramg:MBNFmHAHTGF9rN1l@db:27017/Node-API?authSource=admin"
    //   "mongodb://mohanasundaramg:MBNFmHAHTGF9rN1l@db:27017/Node-API?authSource=admin"
    mongoose
      .connect(mongoURI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
      })
      // "mongodb+srv://mohanasundaramg:MBNFmHAHTGF9rN1l@temp-pro-db.2pnmi.mongodb.net/Node-API?retryWrites=true&w=majority&appName=temp-pro-db"
      .then(() => {
        console.log("db connected");
      })
      .catch((err) => {
        console.log(err);
      });

    app.listen(3000,'0.0.0.0',(e)=>{
        try{
            console.log("server is running on http://db:3000");
        }
        catch(e){
            console.log(e);
        }
    })

    