import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";
import fs from 'fs'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(process.cwd(), "uploads");

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Multer Config
export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        const allowed = /jpeg|jpg|png/;
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowed.test(ext)) {
            cb(null, true);
        } else {
            cb(new Error("Only images are allowed (jpeg, jpg, png)"));
        }
    }
});