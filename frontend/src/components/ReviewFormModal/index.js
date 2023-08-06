import './ReviewForm.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
function ReviewFormModal() {
    const [comment, setComment] = useState("")
    const [errors, setErrors] = useState({});
    const [rating, setRating] = useState(0);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const newReview ={review: comment, stars: rating}
    }
    return (
        <>
            <div>
                <h1>How was your stay?</h1>
                <input
                type='text'
                placeholder="Leave your review here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                ></input>
            </div>
            <div className='rating'>
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
                <div>Stars</div>
            </div>
            <button disabled={comment.length<10} onClick={handleSubmit}>Submit Your Review</button>
        </>
    )
}
export default ReviewFormModal
