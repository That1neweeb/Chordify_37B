import multer from "multer";
import path from "path";
import fs from "fs";

// Helper to create folder if it doesn't exist
const ensureFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

// Generic storage function
const createStorage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      ensureFolder(folder);
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type. Only JPEG, PNG, and GIF allowed!"), false);
};

// Profile upload
export const uploadProfile = multer({
  storage: createStorage("uploads/profiles"),
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

// Product upload
export const upload = multer({
  storage: createStorage("uploads/products"),
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});


// Video file filter
const videoFileFilter = (req, file, cb) => {
  const allowedTypes = ["video/mp4", "video/avi", "video/mov", "video/mkv"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type. Only MP4, AVI, MOV, MKV allowed!"), false);
};

// Video upload middleware
export const uploadVideo = multer({
  storage: createStorage("uploads/videos"), // store videos separately
  fileFilter: videoFileFilter,
  limits: { fileSize: 1024 * 1024 * 500 }, // 500 MB limit
});
