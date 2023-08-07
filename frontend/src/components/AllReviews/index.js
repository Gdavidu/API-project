import { fetchSpotReviews } from "../../store/reviews";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalButton from '../OpenModalButton';
export default function GetAllSpotReviews({ spotId, reviewCount }) {

    const reviews = useSelector((state) => (state.reviews ? state.reviews : {}))
    const reviewsArr = Object.values(reviews.spot)
    reviewsArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    const dispatch = useDispatch();
    // console.log('id from review component',  spotId)
    // console.log('reviewsArr', reviewsArr)
    // console.log(reviewCount)
    // console.log('typeof spotId', typeof reviewsArr[0].spotId)
    const sessionUser = useSelector(state => state.session.user)
    const owner = useSelector(state => state.spots.singleSpot.ownerId)
    useEffect(() => {
        dispatch(fetchSpotReviews(spotId));
    }, [dispatch, spotId]);


    // console.log(owner)

    // const testDate = new Date('2023-08-01T23:59:46.000Z')
    // console.log('Month', testDate.toDateString())


    const formatDate = (date) =>{
        const newDate = new Date(date)
        const monthNames = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];
        const month= newDate.getMonth()
        const year = newDate.getFullYear()
        return monthNames[month]+ " "+ year
    }

    // console.log('sorted?', reviewsArr)

    console.log('sessionUser', sessionUser)
    if(sessionUser && !(owner===sessionUser.id) && (reviewCount === 0)){
        return (
            <div>Be the first to post a review!</div>
        )
    }
    return (
        <>
        {reviewsArr.map((review)=>{

            // if(!(review.spotId.toString() === spotId)){
            //     return null
            // }

            if(reviewCount === 0){
                return null
            }
            // if (!(reviewsArr.length> 0)) {
            //     return null
            // }
            return(
            <div key={review.id} className="reviewContainer">
                <div className="reviewHeader">
                    <div className="reviewUser">{review.User? review.User.firstName: null}</div>
                    <div className="reviewDate">
                        {
                            formatDate(review.createdAt)
                        }
                    </div>
                </div>
                <div className="reviewText">
                    {review? review.review: null}
                </div>
                {sessionUser && review.User && review.User.id===sessionUser.id? <OpenModalButton
                                        buttonText="Delete"
                                        modalComponent={<DeleteReviewModal review={review}/>}/>: null }
            </div>
            )


        })}
        </>
    )
}
