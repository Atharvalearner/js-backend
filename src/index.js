// require('dotenv').config({path: './env'})    
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db';
const app = express()

dotenv.config({
    path: './env'
})
connectDB;
















// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI} / ${DB_NAME}`);
//         app.on("error",(error) => {
//             console.error("ERROR: ",error);
//             throw error;
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port: ${process.env.PORT}`);
//         })
//     }catch(error){
//         console.error("ERROR: ",error)
//         throw error
//     }
// }
// )()