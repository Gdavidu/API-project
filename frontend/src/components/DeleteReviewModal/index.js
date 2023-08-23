import { useModal } from '../../context/Modal';
import {useDispatch} from 'react-redux'
import { deleteReview } from '../../store/reviews';
import { fetchSpotReviews } from '../../store/reviews';
import { fetchSpotDetail } from '../../store/spots';
function DeleteReviewModal({ review }) {
    const dispatch = useDispatch({review})
    const { closeModal } = useModal();
    const reviewId = review.id
    console.log('DeleteReview review',review)
    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteReview(reviewId)).then(closeModal);
        await dispatch(fetchSpotReviews(review.spotId))
        await dispatch(fetchSpotDetail(review.spotId))
    }
    return (
        <>
            <title>Confirm Delete</title>
            <h4>Are you sure you want to delete this review?</h4>
            <button className='LastButtons' onClick={handleDelete}>Yes (Delete Review)</button>
            <button className='LastButtons' id='greyedBtn' onClick={closeModal}>No (Keep Review)</button>
        </>
    )

}
export default DeleteReviewModal
