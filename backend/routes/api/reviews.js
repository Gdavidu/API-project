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


module.exports = router;
