require('dotenv').config()
const AWS = require('aws-sdk')
const fs = require('fs')
const mime = require('mime')

const s3 = new AWS.S3()

const filePath = './limestone.jpg'

// console.log(mime.getType(filePath))

fs.readFile('./limestone.jpg', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    var params = {
      ACL: 'public-read',
      Bucket: 'setup-guide-team-project',
      Key: 'key',
      ContentType: mime.getType(filePath),
      Body: data
    }

    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
  }
})

// console.log(s3.upload)
