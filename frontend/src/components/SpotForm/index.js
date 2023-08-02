import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './SpotForm.css'
export default function SpotForm() {
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [url, setUrl] = useState([]);
    const [errors, setErrors] = useState({});
    return (
        <>
            <form>
                <h1>Create a New Spot</h1>
                <h3>{"Where's your place located?"}</h3>
                <h4>Guests will only get your exact address once they booked a
                    reservation.
                </h4>
                <label>Country
                    <input type="text" placeholder='Country'></input>
                </label>
                <label>Street Address
                    <input type="text" placeholder='Address'></input>
                </label>
                <label>City
                    <input type="text" placeholder='City'></input> State
                    <input type="text" placeholder='State'></input>

                </label>
                <h3>Describe your place to guests</h3>
                <label>Mention the best features of your space, any special amentities like
                    fast wifi or parking, and what you love about the neighborhood.
                    <input type="text" placeholder='Please write at least 30 characters'></input>
                </label>
                <h3>Create a title for your spot</h3>
                <label>Catch guests' attention with a spot title that highlights what makes
                    your place special.
                    <input type="text" placeholder='Name of your spot'></input>
                </label>
                <h3>Set a base price for your spot</h3>
                <label>Competitive pricing can help your listing stand out and rank higher
                    in search results
                    $ <input type="number" placeholder='Price per night (USD)'></input>
                </label>
                <h3>Liven up your spot with photos</h3>
                <label>Submit a link to at least one photo to publish your spot.
                    <input type="url" placeholder='Preview Image URL'></input>
                    <input type="url" placeholder='Image URL'></input>
                    <input type="url" placeholder='Image URL'></input>
                    <input type="url" placeholder='Image URL'></input>
                    <input type="url" placeholder='Image URL'></input>
                </label>
                <button>Create Spot</button>
            </form>
        </>
    )
}
