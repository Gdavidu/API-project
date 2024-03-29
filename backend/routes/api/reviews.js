const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get(
    '/current', requireAuth,
    async (req, res) => {
        const { user } = req
        const payload = await Review.findAll({
            where: { userId: user.id },
            include:
                [
                    {
                        model: User,
                        attributes: ['id', 'firstName', 'lastName']
                    },
                    {
                        model: Spot,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        include: { model: SpotImage }
                    },

                    {
                        model: ReviewImage,
                        attributes: ['id', 'url']
                    }
                ]
        })
        const reviews = [];
        payload.forEach(review => {
            reviews.push(review.toJSON())
        });
        reviews.forEach(ele => {
            ele.Spot.SpotImages.forEach(image => {
                if (image.preview) {
                    ele.Spot.previewImage = image.url
                }
            })
            delete ele.Spot.SpotImages
        })
        return res.json({ "Reviews": reviews })
    })

router.post('/:id/images', requireAuth,
    async (req, res, next) => {
        const { id } = req.params
        const { user } = req
        const { url } = req.body
        const review = await Review.findByPk(id, { include: { model: ReviewImage } })
        if (!review) {
            res.status(404).json({
                "message": "Review couldn't be found"
            })
        }
        // console.log(review.ReviewImages)
        // console.log(review.dataValues)
        if (!(review.dataValues.userId === user.id)) {
            return res.status(403).json({ "message": "Forbidden" })
        }
        // console.log(review.dataValues.ReviewImages.length)
        if (review.dataValues.ReviewImages.length > 10) {
            return res.status(403).json({
                "message": "Maximum number of images for this resource was reached"
            })
        }
        const newImage = await ReviewImage.create({ reviewId: id, url: url })
        const returnObj = {
            id: newImage.id,
            url: newImage.url
        }
        return res.json(returnObj)
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

router.put('/:id', requireAuth, validateReview, async (req, res, next) => {
    const { id } = req.params
    const { user } = req
    const { review, stars } = req.body
    const existingReview = await Review.findByPk(id)
    if (!existingReview) {
        return res.status(404).json({
            "message": "Review couldn't be found"
        })
    }
    // console.log(existingReview.userId)
    if (!(existingReview.userId === user.id)) {
        return res.status(403).json({ "message": "Forbidden" })
    }
    await existingReview.update({ review, stars })
    await existingReview.save()
    return res.json(existingReview)
})

router.delete('/:id', requireAuth,
    async (req, res, next) => {
        const { id } = req.params
        const { user } = req
        const review = await Review.findByPk(id)
        if (!review) {
            return res.status(404).json({ "message": "Review couldn't be found" })
        }
        if (review.userId === user.id) {
            await review.destroy();
            return res.status(200).json({
                "message": "Successfully deleted"
            })
        }
        else {
            return res.status(403).json({ "message": "Forbidden" })
        }
    })
module.exports = router;
