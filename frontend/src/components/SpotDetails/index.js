import { useEffect } from 'react';
import { fetchSpotDetail } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
const notFound = "https://t4.ftcdn.net/jpg/05/17/53/57/240_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg"
export default function GetSpotDetails() {
    const {id} = useParams()
    const spot = useSelector((state)=> (state.spots ? state.spots.singleSpot : {}))
    const dispatch = useDispatch();

    // const spotOwner = useSelector((state)=>(state.spots? state.spots.Owner : {}))
    // console.log('spotOwner',spotOwner)

    // console.log('id:', id, 'spotDetails:', spot, 'spotImages', spotImageArr, 'Owner:', spot.Owner)
    useEffect(() => {
        dispatch(fetchSpotDetail(id));
    }, [dispatch, id]);

    if(!(Object.values(spot).length > 0)){
        return null
    }

    return (
        <>
        <h1>{spot.name}</h1>
        <h3>{spot.city},{spot.state},{spot.country}</h3>
        <img className='imageOne' src={(spot.SpotImages && spot.SpotImages[0])? spot.SpotImages[0].url : notFound} alt='Not Found' />
        <div className='smallImgContainer'>
        <img className='imageTwo' src={(spot.SpotImages && spot.SpotImages[1])? spot.SpotImages[1].url : notFound} alt='Not found'/>
        <img className='imageThree' src={(spot.SpotImages && spot.SpotImages[2])? spot.SpotImages[2].url : notFound} alt='Not found'/>
        <img className='imageFour' src={(spot.SpotImages && spot.SpotImages[3])? spot.SpotImages[3].url : notFound} alt='Not found'/>
        <img className='imageFive' src={(spot.SpotImages && spot.SpotImages[4])? spot.SpotImages[4].url : notFound} alt='Not found'/>
        </div>
        <h5>Hosted by {spot.Owner? spot.Owner.firstName: null}, {spot.Owner?spot.Owner.lastName: null}</h5>
        <p>{spot.description}</p>
        <div className='calloutBox'>
            <div className='pricing'>{spot.price} night</div>
            <button onClick={()=>{ alert('Feature Coming Soon'); }}>Reserve</button>
        </div>


        </>
    )
}
