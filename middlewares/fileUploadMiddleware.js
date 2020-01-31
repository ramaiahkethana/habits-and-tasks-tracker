import multer from 'multer'
const MAX_FILE_SIZE_IN_MB = 5
const MAX_FILE_SIZE = MAX_FILE_SIZE_IN_MB * 1024 * 1024
module.exports.saveUserProfilePic = function (req, res, next) {
  const saveUserProfilePic = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: MAX_FILE_SIZE
    },
    fileFilter: (req, file, cb) => {
      const allowMimeTypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "application/octet-stream"
      ]

      if (allowMimeTypes.indexOf(file.mimetype) > -1) {
        cb(null, true);
      } else {
        cb(null, false);
        const err = new Error('Allowed only .png, .jpg, .jpeg and .gif');
        err.statusCode = 422
        return cb(err)
      }
    },
  }).single('avatar')

  saveUserProfilePic(req, res, (err) => {
    if (err) {

      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        err.statusCode = 422
        err.message = 'avatar field is required'
      } else if (err.code === 'LIMIT_FILE_SIZE') {
        err.statusCode = 422
        err.message = `File is too large !. Maximum file size allowed is ${MAX_FILE_SIZE_IN_MB} MB`
      }
      return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Something went wrong !'
      })
    } else {
      next()
    }
  })
}