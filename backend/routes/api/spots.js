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
        const spots = await Spot.findAll({
            include:
            [
                {
                    model: Review
                },
                {
                    model:SpotImage
                }
            ]
        })
        const spotArr =[];
        spots.forEach(spot => {
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

            delete spot.SpotImages
        });
        spotArr.forEach(ele => {
            delete ele.Reviews
        })
        res.json(spotArr)
    })

    router.get('/current',
        async (req, res) => {
            const {user} = req;
            console.log(typeof user.id)
            const payload = await Spot.findAll({
                where:{ ownerId : user.id},
                include:
            [
                {
                    model: Review
                },
                {
                    model:SpotImage
                }
            ]
            })
            const Spots = [];
            payload.forEach(spot => {
                Spots.push(spot.toJSON())
            });
            Spots.forEach(spot => {
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

                delete spot.SpotImages
            });
            Spots.forEach(ele => {
                delete ele.Reviews
            })
            res.json(Spots)
        })
module.exports = router;
