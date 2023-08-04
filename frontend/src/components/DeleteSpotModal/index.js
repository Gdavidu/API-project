import {useHistory} from 'react-router-dom'
import { deleteSpot } from '../../store/spots';
import {useDispatch} from 'react-redux'
// import { useModal } from "../../context/Modal";
function DeleteSpotModal({spot}){
    // const spot = useSelector((state)=> (state.spots ? state.spots.singleSpot : {}))
    const dispatch = useDispatch()
    console.log('spot in question?', spot)
    // const {setOnModalClose} = useModal()

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spot.id));
      };
    return(
        <>
            <h1>Confirm Delete</h1>
            <h4>Are you sure you want to remove this spot?</h4>
            <button onClick={handleDelete}>Yes (Delete Spot)</button>
            <button onClick={(e)=>{window.location.reload(false)}}>No (Keep Spot)</button>
        </>
    )
}

export default DeleteSpotModal
