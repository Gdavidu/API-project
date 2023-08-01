import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = '/spots'

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
        spots
})

export const fetchSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
        const spots = await res.json();
        dispatch(loadSpots(spots));
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
            return {...state, allSpots: spotsState};
        default:
            return state
    }
}
export default spotsReducer
