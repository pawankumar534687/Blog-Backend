import dotenv from "dotenv";
dotenv.config();
import {
    v2 as cloudinary
} from "cloudinary";
import multer from "multer";
import {
    CloudinaryStorage
} from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const getUpload = (folderName) => {
    const storage = new CloudinaryStorage({
        cloudinary,
        params: async (req, file) => {
            return {
                folder: folderName,
                allowed_formats: ["jpeg", "png", "jpg", "webp", "jfif"],
            };
        },
    });

    return multer({
        storage
    });
}
export default getUpload;