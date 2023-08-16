const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const cloudinary = require('../config/cloudinary')
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const Users = require('../models/Users')
const BlogPosts = require('../models/BlogPosts')
const UsersInformation = require('../models/UsersInformation')


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog',
        allowedFormats: ["jpg", "jpeg", "png"],
    },
})

const upload = multer({
    storage
})

class BlogController {

    // [POST] /blog/upload-images
    async uploadImage(req, res, next) {
        try {
            upload.fields([{ name: 'file', maxCount: 1 }])(req, res, function (err) {
                if (err) {
                    return next(err)
                }
                if (!req.files || !req.files['file']) {
                    return res.status(400).json({ error: 'No file provided' })
                }
                const file = req.files['file'][0]
                const fileUrl = file.path
                return res.status(200).json({ 
                    message: 'File uploaded successfully',
                    fileUrl: fileUrl,
                })
            });
        } catch (error) {
            next(error)
        }
    }

    // [GET] /blog/post-blog
    async getPostBlog(req, res, next) {
        try {
            const { id } = await req.query
            const blogPost = await BlogPosts.findById({ _id: id })
            if (!blogPost) {
                return res.status(500).json({
                    message: 'Post blog not found!'
                })
            }
            const author = await Users.findById({ _id: blogPost.author_id})
            const authorInfor = await UsersInformation.findOne({ User_id: blogPost.author_id })
            if (!author || !authorInfor) {
                return res.status(500).json({
                    message: 'Author not found!'
                })
            }
    
            res.status(200).json({
                name: authorInfor.firstname + ' ' + authorInfor.lastname,
                username: author.username,
                title: blogPost.title,
                createdAt: blogPost.createdAt,
                cover_url: blogPost.cover_url,
                content: blogPost.content,
            })
        } catch (error) {
            next(error)
        }
    }

    // [GET] /blog/list-post
    async getListPost(req, res, next) {
        try {
            const listPost = [];
    
            const blogPosts = await BlogPosts.find();
    
            for (const post of blogPosts) {
                const author = await Users.findById(post.author_id);
                const postBlog = {
                    author: author.username,
                    post
                };
                listPost.push(postBlog);
            }
    
            return res.status(200).json({
                listPost: listPost
            });
        } catch (error) {
            next(error);
        }
    }
    

    // [POST] /blog/post-blog
    async createPost(req, res, next) {
        try {
            const { title, imageSrc, content } = req.body
            const user = await Users.findById({ _id: req.userId})

            if(user) {
                const blogPosts = new BlogPosts({
                    cover_url: imageSrc,
                    title,
                    content,
                    author_id: user._id 
                })
                await blogPosts.save()
                    .then(result => {
                        res.status(200).json({
                            message: 'Created successfully!',
                            id: result._id
                        })
                    })
                    .catch(err => {
                        next(err)
                    })
            }
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new BlogController