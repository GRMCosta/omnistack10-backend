const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
    async index(req, res){
        const { latiture, longitude, techs} = req.query
        const techsArray = parseStringAsArray(techs);

        const devss = await Dev.find({ 
            techs: {
                $in: techsArray,
            },
            location:{
                $near: {
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude,latiture]
                    },
                    $maxDistance: 10000
                },
            }
         });

        return res.json({ devs : []})
    }
}

