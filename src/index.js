//require("dotenv").config();
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDB();

// IIFI METHOD APPROACH
// import  express  from "express";
// const app = express()

// (async()=>{
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//        app.on("error",()=>{
//         console.log("err","we got error");
//         throw(error)
//        })
//        app.listen(process.env.PORT,()=>{
//         console.log(`we are listening at ${process.env.PORT}`)
//        })
//     }catch(err){
//         console.log(err)
//     }
// })()
