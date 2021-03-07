import multer from 'multer';

export const saveImage = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './dist/images');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});

export const saveVideo = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './dist/videos');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
})