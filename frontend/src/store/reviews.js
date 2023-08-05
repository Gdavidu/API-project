import { csrfFetch } from "./csrf";

export const LOAD_REVIEWS = '/reviews'

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const fetchSpotReviews = (spotId) => async (dispatch) => {
   try { const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (res.ok) {
        const reviews = await res.json();
        dispatch(loadReviews(reviews));
    }}
    catch(err) {
        const errors = await err.json()
        return errors
    }
}

const initialState = {spot:{}, user:{}}
const reviewsReducer = (state= initialState, action) => {
    let newState
    switch(action.type){
        case LOAD_REVIEWS:
            const reviewsState ={};
            action.reviews.Reviews.forEach((review)=>{
                reviewsState[review.id] = review
            })
            return {...state, spot: reviewsState}
        default:
            return state
    }
}
export default reviewsReducer
