const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')


class BlogController {

    // [POST] /blog/upload-images
    async uploadImage(req, res, next) {
        var form = new formidable.IncomingForm({
            uploadDir: path.join(__dirname, '../../uploads/blog'),
            keepExtensions: true,
            multiples: true
        })
        form.parse(req, (err, fields, files) => {
            if(err) {
                res.status(500).json({
                    message: 'Cannot upload images!'
                })
            }
            var arrayOfFiles = files['']
            if(arrayOfFiles && arrayOfFiles.length > 0) {

                var fileNames = []
                arrayOfFiles.forEach(file => {
                    fileNames.push(file.newFilename)
                })
                res.status(200).json({
                    message: 'Upload images successfully!',
                    data: fileNames,
                    numberOfImages: fileNames.length
                })
            } else {
                res.status(500).json({
                    message: 'No images to upload!'
                })
            }
        })
    }

    // [GET] /blog/open-image
    async openImage(req, res, next) {
        let imageName = path.join(__dirname, '../../uploads/blog/' + req.query.image_name)
        fs.readFile(imageName, (err, imageData) => {
            if(err) {
                return next(err)
            }
            res.writeHead(200, {'Content-Type': 'image/jpeg'})
            res.end(imageData)
        })
    }

    
}

module.exports = new BlogController