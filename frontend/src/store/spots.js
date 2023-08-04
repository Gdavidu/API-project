import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = '/spots'
export const GET_SPOTDETAIL = '/spots/id'
export const RECEIVE_SPOT = '/spots/receive'
export const EDIT_SPOT = '/spots/edit/:id'
export const REMOVE_SPOT = '/spots/delete/:id'
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const loadSpotDetails = (spot) => ({
    type: GET_SPOTDETAIL,
    spot
})

export const receiveSpot = (spot) => ({
    type: RECEIVE_SPOT,
    spot,
});

export const editSpot = (spot) => ({
    type: EDIT_SPOT,
    spot
})

export const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
    spotId,
  });


export const fetchCurrentSpots = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/current`)
    if (res.ok) {
        const spots = await res.json();
        dispatch(loadSpots(spots));
    }
}

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

export const updateSpot = (spot) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spot.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot),
        });

        if (res.ok) {
            console.log('res ok')
            const updatedSpot = await res.json();
            dispatch(editSpot(updatedSpot));
            return updatedSpot;
        }
    }
    catch(err) {

    const errors = await err.json();
    return errors;
}
};

export const createSpot = (spot, images) => async (dispatch) => {
    // console.log('spot from creat spot thunk', spot)
    // console.log(images)
    const spotImageArr = []
    images.forEach((image) => {
        if (image) { spotImageArr.push({ preview: true, url: image }) }
    });
    // console.log(spotImageArr)
    try {
        const res = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
        });
        if (res.ok) {
            const newSpot = await res.json();
            // newSpot.SpotImages = spotImageArr
            const createSpotImage = async (image) => {
                const res = await csrfFetch(`/api/spots/${newSpot.id}/images`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(image)
                    })
                if (res.ok) {
                    const newImage = await res.json()
                    return newImage
                }
            }
            spotImageArr.forEach((image) => {
                createSpotImage(image)
            });

            dispatch(receiveSpot(newSpot));
            return newSpot;
        }
    }
    catch (err) {

        const errors = await err.json();
        // console.log("errors from catch", errors)
        return errors;
    }


};

export const deleteSpot = (spotId) => async (dispatch) => {
   try {const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      dispatch(removeSpot(spotId));}
    }

    catch (err){
        const errors = await err.json()
        return errors
    }
}

const initialState = { allSpots: {}, singleSpot: {} }

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            const spotsState = {};
            action.spots.Spots.forEach((spot) => {
                spotsState[spot.id] = spot;
            });
            return { ...state, allSpots: spotsState };
        case GET_SPOTDETAIL:
            return { ...state, singleSpot: action.spot }
        case RECEIVE_SPOT:
            newState = { ...state }
            newState.singleSpot = action.spot
            return newState
        case EDIT_SPOT:
            newState = { ...state }
            newState.singleSpot = action.spot
            return newState
            case REMOVE_SPOT:
                newState = {...state}
                delete newState.singleSpot[action.spotId]
                return newState
        default:
            return state
    }
}
export default spotsReducer
