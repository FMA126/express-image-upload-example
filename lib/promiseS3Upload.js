require('dotenv').config()
const AWS = require('aws-sdk')
const fs = require('fs')
const mime = require('mime')

const s3 = new AWS.S3()

// console.log(mime.getType(filePath))

const promiseReadFile = function (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve([data, file])
    })
  })
}

const createParams = dataAndFile => ({
  ACL: 'public-read',
  Bucket: process.env.BUCKET_NAME,
  Key: Math.random().toString().split('.')[1],
  ContentType: mime.getType(dataAndFile[1]),
  Body: dataAndFile[0]
})

const s3Upload = function (params) {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = {
  promiseReadFile,
  createParams,
  s3Upload
}
// console.log(s3.upload)
