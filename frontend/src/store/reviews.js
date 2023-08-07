import { csrfFetch } from "./csrf";

export const LOAD_REVIEWS = '/reviews'

export const RECEIVE_REVIEW = '/spots/id/review'


export const REMOVE_REVIEW = '/reviews/id'

export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
})
export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const receiveReview = (review) => ({
    type: RECEIVE_REVIEW,
    review
})

export const deleteReview = (reviewId) => async (dispatch) => {
    try {const res = await csrfFetch(`/api/reviews/${reviewId}`, {
       method: 'DELETE',
     });

     if (res.ok) {
       dispatch(removeReview(reviewId));}
     }

     catch (err){
         const errors = await err.json()
         return errors
     }
 }

export const createReview = (review, spotId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        });
        if (res.ok) {
            const newReview = await res.json();
            dispatch(receiveReview(newReview))
            return newReview
        }
    }
    catch (err) {
        const errors = await err.json()
        return errors
    }
}

export const fetchSpotReviews = (spotId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
        if (res.ok) {
            const reviews = await res.json();
            dispatch(loadReviews(reviews));
        }
    }
    catch (err) {
        console.log('ERROR FROM CATCH', err)
        const errors = await err.json();
        console.log("errors from request", errors)
        return errors
    }
}

const initialState = { spot: {}, user: {} }
const reviewsReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_REVIEWS:
            const reviewsState = {};
            action.reviews.Reviews.forEach((review) => {
                reviewsState[review.id] = review
            })
            newState = { ...state, spot: reviewsState }
            console.log('state from reducer', newState)
            return { ...state, spot: reviewsState }
            case RECEIVE_REVIEW:
                newState = {...state}
                const newKey = action.review.id
                newState.spot[newKey] = action.review
                // console.log('GOOD STATE(FROM REDUCER)?',newState)
                return newState
                case REMOVE_REVIEW:
                    newState = {...state}
                    delete newState.spot[action.reviewId]
                    return newState
        default:
            return state
    }
}
export default reviewsReducer
