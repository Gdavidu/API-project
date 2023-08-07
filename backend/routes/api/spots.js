const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
// const queryValidator = [
//     check('page')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 1, max:10 })
//         .withMessage("Page must be greater than or equal to 1"),
//     check('size')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 1,max: 20})
//         .withMessage("Size must be greater than or equal to 1"),
//     check('maxLat')
//         .exists({ checkFalsy: true })
//         .isLength([])
//         .withMessage("Maximum latitude is invalid"),
//     check('minLat')
//         .exists({ checkFalsy: true })
//         .isNumeric()
//         .withMessage("Maximum longitude is invalid"),
//     check('minLng')
//         .exists({ checkFalsy: true })
//         .isNumeric()
//         .withMessage("Minimum latitude is invalid"),
//     check('maxLng')
//         .exists({ checkFalsy: true })
//         .isNumeric()
//         .withMessage("Minimum longitude is invalid"),
//     check('minPrice')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 0 })
//         .withMessage("Minimum price must be greater than or equal to 0"),
//     check('maxPrice')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 0 })
//         .withMessage("Maximum price must be greater than or equal to 0"),
//     handleValidationErrors
// ];


router.get(
    '/',
    async (req, res) => {
        let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query
        let errs = {}
        const validQueries = {}
        const pagination = {}
        if (page && size) {

            page = parseInt(page);
            pagination.offset = size * (page - 1)

        }
        if (size) {
            size = parseInt(size);
            pagination.limit = size
        }

        if (Number.isNaN(page) || page < 1 || page > 10) {
            errs.page = "Page must be greater than or equal to 1"
            page = 1;
        }
        if (Number.isNaN(size) || size < 1 || size > 20) {
            errs.size = "Size must be greater than or equal to 1"
            size = 20;
        }
        if (maxLat && (maxLat < -90 || maxLat > 90)) {
            errs.maxLat = "Maximum latitude is invalid"
        }
        else {
            validQueries.maxLat = maxLat
        }
        if (minLat && (minLat < -90 || minLat > 90)) {
            errs.minLat = "Minimum latitude is invalid"
        }
        else {
            validQueries.minLat = minLat
        }
        if (minLng && (minLng < -180 || minLng > 180)) {
            errs.minLng = "Minimum longitude is invalid"
        }
        else {
            validQueries.minLng = minLng
        }
        if (maxLng && (maxLng < -180 || maxLng > 180)) {
            errs.maxLng = "Maximum longitude is invalid"
        }
        else {
            validQueries.maxLng = maxLng
        }
        if (maxPrice && (maxPrice < 0)) {
            errs.maxPrice = "Maximum price must be greater than or equal to 0"
        }
        else {
            validQueries.maxPrice = maxPrice
        }
        if (minPrice && (minPrice < 0)) {
            errs.minPrice = "Minimum price must be greater than or equal to 0"
        }
        else {
            validQueries.minPrice = minPrice
        }

        if (!validQueries.maxLat) validQueries.maxLat = 9199999999
        if (!validQueries.maxLng) validQueries.maxLng = 181999999999
        if (!validQueries.maxPrice) validQueries.maxPrice = 999999999
        if (!validQueries.minLng) validQueries.minLng = -999999999
        if (!validQueries.minLat) validQueries.minLat = -9199999999
        if (!validQueries.minPrice) validQueries.minPrice = 0

        const spots = await Spot.findAll({
            where: {
                [Op.and]: [
                    {
                        lat: { [Op.gte]: validQueries.minLat }
                    },
                    {
                        lng: { [Op.gte]: validQueries.minLng }
                    },
                    {
                        price: { [Op.gte]: validQueries.minPrice }
                    },
                    {
                        price: { [Op.lte]: validQueries.maxPrice }
                    },
                    {
                        lat: { [Op.lte]: validQueries.maxLat }
                    },
                    {
                        lng: { [Op.lte]: validQueries.maxLng }
                    }
                ]
            },
            include:
                [
                    {
                        model: Review
                    },
                    {
                        model: SpotImage
                    }
                ],
            ...pagination
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
            if(stars === 0){
                spot.avgRating = 0
            }
            else{

                spot.avgRating = (stars / counter).toFixed(1)
            }
            counter = 0
            stars = 0;

            delete spot.SpotImages
        });
        spotArr.forEach(ele => {
            delete ele.Reviews
        })
        if (Object.keys(errs).length) {
            return res.json({ "errors": errs })
        }
        return res.json({ "Spots": spotArr, page, size })
    })

router.get('/current', requireAuth,
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
            if(stars === 0){
                spot.avgRating = 0
            }
            else{

                spot.avgRating = (stars / counter).toFixed(1)
            }
            counter = 0
            stars = 0;

            delete spot.SpotImages
        });
        Spots.forEach(ele => {
            delete ele.Reviews
        })
        return res.json({ "Spots": Spots })
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
                        model: SpotImage, attributes: ['id', 'url', 'preview']
                    },
                    {
                        model: User, attributes: ['id', 'firstName', 'lastName']
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
        if(stars === 0){
            payload.dataValues.avgRating = 0
        }
        else{

            payload.dataValues.avgRating = (stars / counter).toFixed(1)
        }

        payload.dataValues.numReviews = counter
        counter = 0
        stars = 0;

        delete payload.dataValues.Reviews
        return res.json(payload)
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
        .withMessage("Name is required"),
    check('name')
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

router.post('/', requireAuth, validateSpot,
    async (req, res, next) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        const { user } = req
        // console.log(user.id)
        const spot = await Spot.create({ ownerId: user.id, address, city, state, country, lat, lng, name, description, price })
        // const
        return res.json(spot)
    })

router.post('/:id/images', requireAuth,
    async (req, res, next) => {
        const { url, preview } = req.body
        const { id } = req.params
        const { user } = req
        // console.log("user:", user.id)
        // console.log("url:", url)
        // console.log("id:", id)
        const payload = await Spot.findOne({
            where: { id: id }
        })
        // delete payload.dataValues.city
        // console.log(payload)
        if (!(payload)) {
            return res.status(404).json({
                "message": "Spot couldn't be found"
            })
        }
        if (!(payload.dataValues.ownerId === user.id)) {
            return res.status(403).json({
                "message": "Forbidden"
            })
        }
        const image = await SpotImage.create({ spotId: id, url, preview })
        const returnBody = {
            id: image.id,
            url: image.url,
            preview: image.preview
        }
        return res.json(returnBody)
    })

router.put('/:id', requireAuth, validateSpot, async (req, res, next) => {
    const { id } = req.params
    const { user } = req
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const spot = await Spot.findByPk(id)
    if (!spot) {
        return res.status(404).json({ "message": "Spot couldn't be found" })
    }
    // console.log(spot.ownerId)
    // console.log(user.id)
    if (spot.ownerId === user.id) {
        await spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
        await spot.save()
        return res.json(spot)
    }
    else {
        return res.status(403).json({ "message": "Forbidden" })
    }
})

router.delete('/:id', requireAuth,
    async (req, res, next) => {
        const { id } = req.params
        const { user } = req
        const spot = await Spot.findByPk(id)
        if (!spot) {
            return res.status(404).json({ "message": "Spot couldn't be found" })
        }
        if (spot.ownerId === user.id) {
            await spot.destroy();
            return res.status(200).json({
                "message": "Successfully deleted"
            })
        }
        else {
            return res.status(403).json({ "message": "Forbidden" })
        }
    })

router.get(
    '/:id/reviews',
    async (req, res, next) => {
        const { user } = req
        const { id } = req.params
        const reviews = await Review.findAll({
            where: { spotId: id },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: ReviewImage,
                    attributes: { exclude: ['reviewId', 'createdAt', 'updatedAt'] }
                }
            ]
        })
        if (reviews.length === 0) {
            const err = new Error("Spot couldn't be found")
            err.status = 404
            return next(err)
        }
        return res.json({ "Reviews": reviews })
    })
const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];
router.post('/:id/reviews', validateReview, requireAuth,
    async (req, res, next) => {
        const { review, stars } = req.body
        const { id } = req.params
        const { user } = req
        const spot = await Spot.findByPk(id)
        if (!spot) {
            return res.status(404).json({
                "message": "Spot couldn't be found"
            })
        }
        const oldReview = await Review.findOne({ where: { spotId: id, userId: user.id } })
        // console.log(oldReview)
        if (oldReview) {
            return res.status(500).json({
                "message": "User already has a review for this spot"
            })
        }
        const newReview = await Review.create({ userId: user.id, spotId: id, review, stars })
        return res.json(newReview)
    })

router.get(
    '/:id/bookings', requireAuth,
    async (req, res, next) => {
        const { id } = req.params
        const { user } = req
        const spot = await Spot.findByPk(id)
        if (!spot) {
            return res.status(404).json({
                "message": "Spot couldn't be found"
            })
        }
        if (spot.ownerId === user.id) {
            const bookings = await Booking.findAll({ where: { spotId: id }, include: { model: User, attributes: ['id', 'firstName', "lastName"] } })
            return res.json({ "Bookings": bookings })
        }
        else {
            const unowned = await Booking.findAll({ where: { spotId: id }, attributes: ['spotId', 'startDate', 'endDate'] })
            return res.json({ "Bookings": unowned })
        }

    })
const validateBooking = [
    check('endDate').custom((value, { req }) => {
        if ((value) <= (req.body.startDate)) {
            throw new Error("endDate cannot be on or before startDate");
        }
        return true;
    }),
    handleValidationErrors
];
router.post(
    '/:id/bookings', requireAuth, validateBooking,
    async (req, res, next) => {
        const { user } = req
        const { id } = req.params
        const { startDate, endDate } = req.body
        const spot = await Spot.findByPk(id)

        if (!spot) {
            return res.status(404).json({ "message": "Spot couldn't be found" })
        }
        if (spot.ownerId === user.id) {
            return res.status(403).json({ "message": "Forbidden" })
        }
        const booking = await Booking.findOne({
            where: {
                spotId: id,
                [Op.or]: [
                    {
                        startDate: {
                            [Op.between]: [startDate, endDate]
                        }
                    },
                    {
                        endDate: {
                            [Op.between]: [startDate, endDate]
                        }
                    }
                ]
            }
        })
        if (booking) {
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            })
        }

        const newBooking = await Booking.create({ spotId: id, userId: user.id, startDate, endDate })
        res.json(newBooking)
    })

module.exports = router;
