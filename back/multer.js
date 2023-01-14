const multer = require('multer');

const MIME_TYPES = {
  'image/jpg' : 'jpg',
  'image/jpeg' : 'jpg',
  'image/png' : 'png'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(' ').join('_');
    const extensions = MIME_TYPES[file.mimetype];
    cb(null, `${Date.now()}-${name}.${extensions}`);
  },
});

module.exports.upload = multer({ storage }).single('image');
