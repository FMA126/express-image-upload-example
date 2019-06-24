const express = require('express')
const Upload = require('../models/upload')

const router = express.Router()

// CREATE
// POST /examples
router.post('/upload', (req, res, next) => {
  Upload.create(req.body.upload)
    // respond to succesful `create` with status 201 and JSON of new "upload"
    .then(upload => {
      res.status(201).json({ upload: upload.toObject() })
    })
    .catch(next)
})

module.exports = router
