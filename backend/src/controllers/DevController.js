const axios = require('axios')
const Dev = require('../models/developer')
const parseStringAsArray = require('../utils/ParseStringAsArray')


module.exports = {

    async index(req, res){
        const dev = await Dev.find();

        return res.json(dev)
    },

    async store(req, res){
        const {github_username,techs,latitude, longitude} = req.body;

        let dev = await Dev.findOne({github_username})

        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`)
    
        const {name = login, avatar_url, bio,login} = response.data
    
        const techsArray = parseStringAsArray(techs)
    
        const location = {
            type: 'Point',
            coordinates:[longitude,latitude]
        }
    
        dev = await Dev.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs:techsArray,
                    location
                })
        }
    
        return res.json(dev)
    }
}