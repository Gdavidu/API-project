const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking, Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');
const router = express.Router();

router.delete('/:id',requireAuth, async (req,res,next)=>{
    const {id} = req.params
    const{user} = req
    const spotImage = await SpotImage.findOne({where:{id:id}})
    if(!spotImage){
        return res.status(404).json({
            "message": "Spot Image couldn't be found"
          })
    }
    const spot = await Spot.findOne({where:{id:spotImage.spotId}})
    if(!(spot.ownerId===user.id)){
        return res.status(403).json({
            "message": "Forbidden"
          })
    }
    await spotImage.destroy()
    return res.status(200).json({
        "message": "Successfully deleted"
    })
})

module.exports = router;
