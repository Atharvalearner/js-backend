import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    { public_id: "olympic_flag" },
    function (error, result) { console.log(result); });

const uploadCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath)                            // it uploads the file on cloudinary, short time in our system server and then upload it in real cloud.
            return null;
        const responce = await cloudinary.uploader.upload(localFilePath, {      
            resource_type: "auto"                      // auto means it will be images, videos, or other at runtime.
        })
        console.log("file uploaded successfully on Cloudinary",responce_url);
        return responce;
    }catch(error) {
        fs.unlinkSync(localFilePath)        // removed the temporary files when the operation is failed or any issue occured
        return null;
    }
}

export {uploadCloudinary}