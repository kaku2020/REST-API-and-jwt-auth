const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Auth failed' });
  }
};


exports.image = (req,res, next) => {
  upload.single('image');
  next();
};



//we can add middlewares here and would just have to call one middleware function