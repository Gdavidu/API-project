const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking, Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');
const router = express.Router();
router.get(
    '/current', requireAuth,
    async (req, res) => {
        const { user } = req
        const booking = await Booking.findAll({
            where: { userId: user.id },
            // , attributes: ['id','userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
            include:
                {
                    model: Spot,
                    attributes: { exclude: ['description', 'createdAt', 'updatedAt'] },
                    include: {model: SpotImage}
                }
        })
        const allBookings = [];
        booking.forEach(book => {
            allBookings.push(book.toJSON())
        });
        allBookings.forEach(ele => {
            // console.log(ele.Spot.SpotImages)
            ele.Spot.SpotImages.forEach(image =>{
                if (image.preview){
                    // console.log(ele.Spot)
                    ele.Spot.previewImage = image.url

                }
            })
            delete ele.Spot.SpotImages
        })

        return res.json({"Bookings":allBookings})
    })
module.exports = router;
