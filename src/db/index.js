import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log("MONGO CONNECTED ");
  } catch (err) {
    console.log("MONGO DB FAILED", err);
    process.exit(1);
  }
};

// let connectDBs  = (async()=>{
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

export default connectDB;
