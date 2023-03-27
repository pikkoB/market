const express = require("express");
const multer = require("multer");
const path = require('path');


const app = express();

const MIMETYPES = ['image/jpeg', 'image/png'];

const multerUpload = multer({
    // const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
    storage: multer.diskStorage({
        destination: path.join(__dirname, "../../uploads"), 
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (MIMETYPES.includes(file.mimetype)) cb(null, true);
        else cb(new Error(`Only ${MIMETYPES.join(' ')} mimetypes are allowed`));
    },
    limits: {
        fieldSize: 20000000,
    },
});

app.use("/app/uploads/", express.static(path.join(__dirname, "../../uploads")))

module.exports = multerUpload;