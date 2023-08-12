const cloudinary = require('cloudinary').v2
require('dotenv').config()  

cloudinary.config({ 
    cloud_name: 'dshdadptl', 
    api_key: '923674831294794', 
    api_secret: 'lo49vH-pv35Qghq2dJx6ezbaXJk' 
})

module.exports = cloudinary