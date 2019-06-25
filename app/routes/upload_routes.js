const express = require('express')
const Upload = require('../models/upload')
const multer = require('multer')
const multerUpload = multer({ dest: 'tempFiles/' })
const { promiseReadFile, createParams, s3Upload } = require('../../lib/promiseS3Upload')

const router = express.Router()

// CREATE
// POST /examples
router.post('/uploads', multerUpload.single('file'), (req, res, next) => {
  promiseReadFile(req.file)
    .then(createParams)
    .then(s3Upload)
    .then(s3Response => Upload.create({ url: s3Response.Location }))
    // .then(console.log)
    .then(upload => {
      res.status(201).json({ upload: upload.toObject() })
    })
    .catch(console.log)
  // Upload.create(req.body.upload)
  //   // respond to succesful `create` with status 201 and JSON of new "upload"
  //   .then(upload => {
  //     res.status(201).json({ upload: upload.toObject() })
  //   })
  //   .catch(next)
})

module.exports = router
