const multer = require('multer');

// Configure Multer
const storage = multer.memoryStorage(); // store image in memory as a Buffer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // limit: 5MB
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."));
        }
    },
});

module.exports.upload = upload.single('profileImage'); // expecting a single file named 'profileImage'