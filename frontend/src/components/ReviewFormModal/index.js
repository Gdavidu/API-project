import './ReviewForm.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import { useParams } from 'react-router-dom'
import { fetchSpotDetail } from '../../store/spots';
import { fetchSpotReviews } from '../../store/reviews';
function ReviewFormModal() {
    const { closeModal } = useModal();
    const spotId = useSelector(state => state.spots.singleSpot.id)
    // console.log('id from review form', spotId)
    const dispatch = useDispatch()
    const [comment, setComment] = useState("")
    const [errors, setErrors] = useState({});
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const newReview ={review: comment, stars: rating}

            const sentReview = await dispatch(createReview(newReview, spotId))


        if (sentReview.errors) {
            console.log('potential error catch ReviewFORMMODAL',sentReview.errors)
            setErrors(sentReview.errors)
        }
        else{
            await dispatch(fetchSpotReviews(spotId))
            await dispatch(fetchSpotDetail(spotId)).then(closeModal)

        }
    }
    return (
        <>
            <div id='reviewFormInput'>
                <h1>How was your stay?</h1>
                {errors.message && <div className='errors'>{errors.message}</div>}
                {errors.stars && <div className='errors'>{errors.stars}</div>}
                {errors.review && <div className='errors'>{errors.review}</div>}
                <input
                id='reviewComments'
                type='text'
                placeholder="Leave your review here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                ></input>
            </div>
            <div className='reviewRting'>
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={index <= rating ? "on" : "off"}
                            id='stars'
                            onClick={() => setRating(index)}
                        >
                            <span className="star">&#9733;</span>
                        </button>
                    );
                })}
                <div className='starReview'>Stars</div>
            </div>
            <button disabled={comment.length<10 || rating===0} onClick={handleSubmit}>Submit Your Review</button>
        </>
    )
}
export default ReviewFormModal
