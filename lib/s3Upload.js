require('dotenv').config()
const AWS = require('aws-sdk')
const fs = require('fs')

const s3 = new AWS.S3()

fs.readFile('./limestone.jpg', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    var params = {
      ACL: 'public-read',
      Bucket: 'setup-guide-team-project',
      Key: 'key',
      ContentType: 'image/jpeg',
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
