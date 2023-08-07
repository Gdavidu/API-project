import { useEffect } from 'react';
import { fetchSpotDetail } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import GetAllSpotReviews from '../AllReviews';
import PostReview from '../PostReview';
import './SpotDetails.css'
const notFound = "https://t4.ftcdn.net/jpg/05/17/53/57/240_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg"
export default function GetSpotDetails() {
    const { id } = useParams()
    const spot = useSelector((state) => (state.spots ? state.spots.singleSpot : {}))
    const dispatch = useDispatch();


    // const spotOwner = useSelector((state)=>(state.spots? state.spots.Owner : {}))
    // console.log('spotOwner',spotOwner)

    // console.log('id:', id, 'spotDetails:', spot, 'spotImages', spotImageArr, 'Owner:', spot.Owner)
    useEffect(() => {
        dispatch(fetchSpotDetail(id));
    }, [dispatch, id]);

    if (!(Object.values(spot).length > 0)) {
        return null
    }


    return (
        <>
            <div className='spotDetailContainer'>
                <div className='header'>
                    <h1>{spot.name}</h1>
                    <h3>{spot.city}, {spot.state}, {spot.country}</h3>
                </div>
                <div className='allImages'>
                    <div className='imageOne'>
                <img id='imgOne' src={(spot.SpotImages && spot.SpotImages[0]) ? spot.SpotImages[0].url : notFound} alt='Not Found' />
                    </div>
                    <div className='imgTwo'>
                    <img className='imageTwo' src={(spot.SpotImages && spot.SpotImages[1]) ? spot.SpotImages[1].url : notFound} alt='Not found' />
                    </div>
                    <div className='imgThree'>
                    <img className='imageThree' src={(spot.SpotImages && spot.SpotImages[2]) ? spot.SpotImages[2].url : notFound} alt='Not found' />
                    </div>
                    <div className='imgFour'>
                    <img className='imageFour' src={(spot.SpotImages && spot.SpotImages[3]) ? spot.SpotImages[3].url : notFound} alt='Not found' />
                    </div>
                    <div className='imgFive'>
                    <img className='imageFive' src={(spot.SpotImages && spot.SpotImages[4]) ? spot.SpotImages[4].url : notFound} alt='Not found' />
                    </div>
                </div>

                <div className='details'>
                    <div className='text'>
                <h3>Hosted by {spot.Owner ? spot.Owner.firstName : null}, {spot.Owner ? spot.Owner.lastName : null}</h3>
                <p className='description'>{spot.description}</p>
                    </div>
                <div className='calloutBox'>
                    <div className='topRow'>
                    <div className='pricing'>${spot.price} night</div>
                    <div className='rightSide'>
                    {spot.avgRating ?
                        <>
                            <div>{spot.avgRating} <i className="fa-solid fa-star fa-xs" style={{ color: 'black' }}></i></div>
                        </> : <div className='newStar'><i className="fa-solid fa-star fa-xs" style={{ color: 'black' }}> New</i></div>
                    }
                    {spot.numReviews > 0 ?
                        <>
                            <div className='dot'>  ·  </div>
                            <div className='reviewCount'>{spot.numReviews} {spot.numReviews === 1 ? "review" : "reviews"}</div>
                        </> : null
                    }
                    </div>
                    </div>
                    <button onClick={() => { alert('Feature Coming Soon'); }}>Reserve</button>
                    </div>
                    </div>
                <div className='reviewDetails'>
                    {spot.avgRating ?
                        <>
                            <div className='reviewTitle'>{spot.avgRating} <i className="fa-solid fa-star fa-sm" style={{ color: 'black' }}></i></div>
                        </> : <div className='lowerStar'><i className="fa-solid fa-star fa-lg" style={{ color: 'black' }}> New</i></div>
                    }
                    {spot.numReviews > 0 ?
                        <>
                            <div className='dot'>  ·  </div>
                            <div className='reviewTitle'>{spot.numReviews} {spot.numReviews === 1 ? "review" : "reviews"}</div>
                        </> : null
                    }
                </div>
                <PostReview reviewCount={spot.numReviews} />
                <div className='reviewContent'>
                <GetAllSpotReviews spotId={id} reviewCount={spot.numReviews} />
                </div>

            </div>
        </>
    )
}
