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

    const validateBooking = [
        check('endDate').custom((value, { req }) => {
            if((value) <= (req.body.startDate)) {
                throw new Error ("endDate cannot be on or before startDate");
            }
            return true;
        }),
        handleValidationErrors
    ];

    router.put(
        '/:id', requireAuth, validateBooking, async (req, res) => {
            const { user } = req
            const {id} = req.params
            const {startDate, endDate} = req.body
            const booking = await Booking.findOne({where:{id:id}})
            if(!booking){
                return res.status(404).json({
                    "message": "Booking couldn't be found"
                  })
            }
            if(!(booking.userId ===user.id)){
                return res.status(403).json({
                    "message": "Forbidden"
                  })
            }

            const existingBooking = await Booking.findOne({
                where:{spotId:booking.spotId,
                [Op.or]:[
                    {
                        startDate:{
                            [Op.between]:[startDate, endDate]
                        }
                    },
                    {
                        endDate:{
                            [Op.between]:[startDate,endDate]
                        }
                    }
                    // {
                    //    startDate:{ [Op.eq]: booking.startDate}
                    // },
                    // {
                    //     endDate:{[Op.eq]: booking.endDate}
                    // }
                ]
            }
            })
            if(existingBooking){
                return res.status(403).json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "errors": {
                      "startDate": "Start date conflicts with an existing booking",
                      "endDate": "End date conflicts with an existing booking"
                    }
                  })
            }
            const currentDate = new Date()
            currentDate.setDate(currentDate.getDate()-1)
            if(currentDate>=new Date(booking.endDate)){
               return res.status(403).json({
                "message": "Past bookings can't be modified"
              })
            }
            await booking.update({startDate:startDate, endDate:endDate})
            return res.json(booking)
        })
        router.delete('/:id', requireAuth, async (req,res,next)=>{
            const {user} = req
            const{id} = req.params
            const booking = await Booking.findOne({where:{id:id}})
            if(!booking){
                return res.status(404).json({
                    "message": "Booking couldn't be found"
                  })
            }
            if(!(booking.userId===user.id)){
                return res.status(403).json({
                    "message": "Forbidden"
                  })
            }
            const currentDate = new Date()
            currentDate.setDate(currentDate.getDate()-1)
            if(new Date(booking.startDate)<currentDate){
                return res.status(403).json({
                    "message": "Bookings that have been started can't be deleted"
                  })
            }
            await booking.destroy();
            return res.status(200).json({
                "message": "Successfully deleted"
            })
        })
module.exports = router;
