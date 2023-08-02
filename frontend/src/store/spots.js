import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = '/spots'
export const GET_SPOTDETAIL = '/spots/id'

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const loadSpotDetails = (spot) => ({
    type: GET_SPOTDETAIL,
    spot
})


export const fetchSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
        const spots = await res.json();
        dispatch(loadSpots(spots));
    }
};

export const fetchSpotDetail = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`);

    if (res.ok) {
        const spotDetails = await res.json();
        dispatch(loadSpotDetails(spotDetails));
    } else {
        const errors = await res.json();
        return errors;
    }
};

const initialState = { allSpots: {}, singleSpot: {} }

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const spotsState = {};
            action.spots.Spots.forEach((spot) => {
                spotsState[spot.id] = spot;
            });
            return { ...state, allSpots: spotsState };
        case GET_SPOTDETAIL:
            return{...state, singleSpot: action.spot}
        default:
            return state
    }
}
export default spotsReducer
