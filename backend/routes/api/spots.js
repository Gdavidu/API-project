const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, Review, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get(
    '/',
    async (req, res) => {
        const Spots = await Spot.findAll({include: [{model: Review}, {model:SpotImage}]})
        const spotArr =[];
        Spots.forEach(spot => {
            spotArr.push(spot.toJSON())

        });

        spotArr.forEach(spot => {
            spot.SpotImages.forEach(image => {
                if(image.preview){
                    spot.previewImage = image.url
                }
            });
            let stars = 0;
            let counter =0;
            spot.Reviews.forEach(review=> {
                stars+=review.stars
                counter+=1
            })
            spot.avgRating = stars/counter
            counter=0
            stars= 0;
            delete spot.Reviews
            delete spot.SpotImages
        });
        res.json(spotArr)
    })
module.exports = router;
