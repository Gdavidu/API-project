import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import OpenModalButton from '../OpenModalButton';
import ReviewFormModal from '../ReviewFormModal';
export default function PostReview({ reviewCount }) {
    const sessionUser = useSelector(state => state.session.user)
    const reviews = useSelector((state) => (state.reviews ? state.reviews : {}))
    const reviewsArr = Object.values(reviews.spot)
    const owner = useSelector(state => state.spots.singleSpot.ownerId)
    // console.log('logged in user from Post Review', sessionUser)
    console.log('reviews from postreview', reviewsArr)
    const { id } = useParams()
    let reviewed = false


    if (reviewCount > 0 && sessionUser) {
        reviewsArr.forEach((review) => {

            if (review.userId === sessionUser.id) {
                reviewed = true
            }
        })
    }

    if (sessionUser && sessionUser.id === owner) return null

    if (!sessionUser || reviewed) {
        return null
    }
    return (
        <div>


            <OpenModalButton
                buttonText='Post Your Review'
                modalComponent= {<ReviewFormModal/>}
            />
            {/* <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteSpotModal spot={spot} />}
                /> */}
        </div>
    )
}
