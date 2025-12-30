import multer from "multer";
import {fileURLToPath} from 'url';
import path from "path";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//storage configuration
const storage = multer.diskStorage({
    destination: function(req,file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'));
    } ,
    filename: function(req,file,cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

//file filter to accept only images
const fileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"), false)
    }
}

export const upload = multer({storage, fileFilter});