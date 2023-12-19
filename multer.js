import multer from "multer";

const storage = multer.diskStorage({        // we can store the files direct on diskstorage instead of main memory, because of file size.
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage: storage })