
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';



cloudinary.config({
    cloud_name:'dhwzghvre',
    api_key:'289591248312399',
    api_secret:'oMys6PJ2k3pWQqf25f8nkUKvUAY',
});
const storage =new multer.memoryStorage();
async function imageUploadUtil(file){
   const result = await cloudinary.uploader.upload(file,{
    resource_type:"auto",
   }) 
   return result
}

const upload =multer({storage});
export {upload,imageUploadUtil};