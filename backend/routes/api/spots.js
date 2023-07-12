const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, Review, SpotImage, User } = require('../../db/models');
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
                        model: SpotImage
                    }
                ]
        })
        const spotArr = [];
        spots.forEach(spot => {
            spotArr.push(spot.toJSON())

        });

        spotArr.forEach(spot => {
            spot.SpotImages.forEach(image => {
                if (image.preview) {
                    spot.previewImage = image.url
                }
            });
            let stars = 0;
            let counter = 0;
            spot.Reviews.forEach(review => {
                stars += review.stars
                counter += 1
            })
            spot.avgRating = stars / counter
            counter = 0
            stars = 0;

            delete spot.SpotImages
        });
        spotArr.forEach(ele => {
            delete ele.Reviews
        })
        res.json({"Spots": spotArr})
    })

router.get('/current',
    async (req, res) => {
        const { user } = req;
        // console.log(typeof user.id)
        const payload = await Spot.findAll({
            where: { ownerId: user.id },
            include:
                [
                    {
                        model: Review
                    },
                    {
                        model: SpotImage
                    }
                ]
        })
        const Spots = [];
        payload.forEach(spot => {
            Spots.push(spot.toJSON())
        });
        Spots.forEach(spot => {
            spot.SpotImages.forEach(image => {
                if (image.preview) {
                    spot.previewImage = image.url
                }
            });
            let stars = 0;
            let counter = 0;
            spot.Reviews.forEach(review => {
                stars += review.stars
                counter += 1
            })
            spot.avgRating = stars / counter
            counter = 0
            stars = 0;

            delete spot.SpotImages
        });
        Spots.forEach(ele => {
            delete ele.Reviews
        })
        res.json({"Spots": Spots})
    })

router.get('/:id',
    async (req, res, next) => {
        const { id } = req.params;

        const payload = await Spot.findOne({
            where: { id: id },
            include:
                [
                    {
                        model: Review
                    },
                    {
                        model: SpotImage
                    },
                    {
                        model: User
                    }
                ]
        })

        if (!payload) {
            const err = new Error("Spot couldn't be found")
            err.status = 404
            return next(err)
        }
        payload.dataValues.Owner = payload.dataValues.User
        delete payload.dataValues.User

        let stars = 0;
        let counter = 0;
        payload.dataValues.Reviews.forEach(review => {
            stars += review.stars
            counter += 1
        })
        payload.dataValues.avgRating = stars / counter
        payload.dataValues.numReviews = counter
        counter = 0
        stars = 0;

        delete payload.dataValues.Reviews
        res.json(payload)
    })
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 49 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors
];

router.post('/', validateSpot,
    async (req, res, next) => {
        const {address, city,state,country, lat , lng, name, description,price} = req.body
        const {user} = req
        // console.log(user.id)
        const spot = await Spot.create({ownerId:user.id, address, city,state,country, lat , lng, name, description,price})
        // const
        return res.json({spot})
    })

module.exports = router;
