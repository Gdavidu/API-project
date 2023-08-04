import {useHistory} from 'react-router-dom'
import { deleteSpot } from '../../store/spots';
import {useDispatch} from 'react-redux'
import { fetchCurrentSpots } from '../../store/spots';
import {useEffect } from 'react'
import { useModal } from '../../context/Modal';
// import { useModal } from "../../context/Modal";
function DeleteSpotModal({spot}){
    // const spot = useSelector((state)=> (state.spots ? state.spots.singleSpot : {}))
    const dispatch = useDispatch()

    // const {setOnModalClose} = useModal()
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spot.id)).then(closeModal);
        await dispatch(fetchCurrentSpots())
    };

    return(
        <>
            <h1>Confirm Delete</h1>
            <h4>Are you sure you want to remove this spot?</h4>
            <button onClick={handleDelete}>Yes (Delete Spot)</button>
            <button onClick={closeModal}>No (Keep Spot)</button>
        </>
    )
}

export default DeleteSpotModal
