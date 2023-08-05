import { fetchSpotReviews } from "../../store/reviews";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'

export default function GetAllSpotReviews({ id }) {
    const reviews = useSelector((state) => (state.reviews ? state.reviews : {}))
    let reviewsArr = Object.values(reviews.spot)
    const dispatch = useDispatch();
    console.log('id from review component', typeof id)
    console.log('reviewsArr from reviews before sort', reviewsArr)
    // console.log('typeof spotId', typeof reviewsArr[0].spotId)
    useEffect(() => {
        dispatch(fetchSpotReviews(id));
    }, [dispatch, id]);

    if (!(reviewsArr.length> 0)) {
        return null
    }

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
    const sortedReviews = reviewsArr.sort((a, b) => a.createdAt - b.createdAt)
    console.log('sorted?', sortedReviews)
    return (
        <>
        {reviewsArr.map((review)=>{

            if(!(review.spotId.toString() === id)){
                return null
            }

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

            </div>
            )


        })}
        </>
    )
}
