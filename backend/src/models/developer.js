const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')

const devSchema = new mongoose.Schema({
    name:String,
    github_username: String,
    bio: String,
    avatar_url:String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2desphere'
    }
})


module.exports = mongoose.model('dev',devSchema)