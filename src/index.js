require('dotenv').config({path: './env'})    
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db';
const app = express()

connectDB

.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db Connection is Failed !!! ",err);
})













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