import multer from "multer";
import path from "path";

//previous upload config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg", 
        "image/png", 
        "image/gif",
        "video/mp4",
        "video/mpeg",
        "video/quicktime",
        "video/x-msvideo",
        "video/webm"
    ];
    if(allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error("Invalid file type. Only JPEG, PNG, GIF images and MP4, MPEG, MOV, AVI, WEBM videos are allowed!"),
            false
        );
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 1024 * 1024 * 50}, // Increased to 50MB for videos
})

export {upload};