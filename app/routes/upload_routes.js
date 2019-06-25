const express = require('express')
const Upload = require('../models/upload')
const multer = require('multer')
const multerUpload = multer({ dest: 'tempFiles/' })
const { promiseReadFile, createParams, s3Upload } = require('../../lib/promiseS3Upload')

console.log(promiseReadFile)

const router = express.Router()

// CREATE
// POST /examples
router.post('/uploads', multerUpload.single('file'), (req, res, next) => {
  console.log(req.file)
  Upload.create(req.body.upload)
    // respond to succesful `create` with status 201 and JSON of new "upload"
    .then(upload => {
      res.status(201).json({ upload: upload.toObject() })
    })
    .catch(next)
})

module.exports = router
