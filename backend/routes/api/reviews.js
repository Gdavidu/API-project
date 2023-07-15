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
                        model: Spot,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },

                    {
                        model: ReviewImage,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    }
                ]
        })
        // console.log(payload)
        // if (!payload) {
        //     const err = new Error("Spot couldn't be found")
        //     err.status = 404
        //     return next(err)
        // }
        return res.json({ "Reviews": payload })
    })

router.post('/:id/images', requireAuth,
    async (req, res, next) => {
const {id} = req.params
const {user} = req
const {url} = req.body
const review = await Review.findByPk(id, {include:{model: ReviewImage}})
if(!review){
    res.status(404).json({
        "message": "Review couldn't be found"
      })
}
// console.log(review.ReviewImages)
// console.log(review.dataValues)
if(!(review.dataValues.userId === user.id))
{
    return res.status(403).json({ "message": "Forbidden" })
}
// console.log(review.dataValues.ReviewImages.length)
if(review.dataValues.ReviewImages.length>10){
    return res.status(403).json({
        "message": "Maximum number of images for this resource was reached"
      })
}
const newImage = await ReviewImage.create({reviewId: id, url: url})
const returnObj = {
    id: newImage.id,
    url: newImage.url}
return res.json(returnObj)
})
module.exports = router;
