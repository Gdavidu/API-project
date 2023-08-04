import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpot, fetchSpotDetail } from '../../store/spots';
import './SpotForm.css'

export default function SpotForm() {
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    // const [lat, setLat] = useState('')
    // const [lng, setLng] = useState("")
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [url1, setUrl1] = useState("");
    const [url2, setUrl2] = useState("");
    const [url3, setUrl3] = useState("");
    const [url4, setUrl4] = useState("");
    const [url5, setUrl5] = useState("");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const history = useHistory()
    const lat = 15;
    const lng = 14;
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if(description.length<30){
            return setErrors({description: "Description needs a minimum of 30 characters"})
        }
        if(!url1){
            return setErrors({previewImage: "Preview image is required"})
        }
        const spot = { country, address, city, state, description, lat, lng, name, price }
        const images = [url1, url2, url3, url4, url5]

        const newSpot = await dispatch(createSpot(spot,images));
        // console.log('spot created', newSpot)
        if (newSpot.errors) {
            setErrors(newSpot.errors);
        }
        else{
            await dispatch(fetchSpotDetail(newSpot.id))
            history.push(`/${newSpot.id}`)
        }

    }
    // console.log(spot)
    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <h1>Create a New Spot</h1>
                <h3>{"Where's your place located?"}</h3>
                <h4>Guests will only get your exact address once they booked a
                    reservation.
                </h4>
                <label>Country
                    <input
                        type="text"
                        placeholder='Country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    ></input>
                    {errors.country && <div className='errors'>{errors.country}</div>}
                </label>
                <label>Street Address
                    <input type="text"
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></input>
                </label>
                {errors.address && <div className='errors'>{errors.address}</div>}
                <label>City
                    <input
                        type="text"
                        placeholder='City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></input>
                </label>
                {errors.city && <div className='errors'>{errors.city}</div>}
                <label>
                    State
                    <input
                        type="text"
                        placeholder='State'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    ></input>
                </label>
                {errors.state && <div className='errors'>{errors.state}</div>}
                {/* <label>
                    Latitude
                    <input
                    type="text"
                    placeholder='Latitude'
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    ></input>
                    </label>

                    <label>
                    Longitude
                    <input
                    type="text"
                    placeholder='Longitude'
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    ></input>
                    </label> */}

                <h3>Describe your place to guests</h3>
                <label>Mention the best features of your space, any special amentities like
                    fast wifi or parking, and what you love about the neighborhood.
                    <input
                        type="text"
                        placeholder='Please write at least 30 characters'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></input>
                    {errors.description && <div className='errors'>{errors.description}</div>}
                </label>
                <h3>Create a title for your spot</h3>
                <label>Catch guests' attention with a spot title that highlights what makes
                    your place special.
                    <input
                        type="text"
                        placeholder='Name of your spot'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </label>
                {errors.name && <div className='errors'>{errors.name}</div>}
                <h3>Set a base price for your spot</h3>
                <label>Competitive pricing can help your listing stand out and rank higher
                    in search results
                    $ <input
                        type="price"
                        placeholder='Price per night (USD)'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></input>
                </label>
                {errors.price && <div className='errors'>{errors.price}</div>}
                <h3>Liven up your spot with photos</h3>
                <label>Submit a link to at least one photo to publish your spot.
                    <input
                        type="url"
                        placeholder='Preview Image URL'
                        value={url1}
                        onChange={(e) => setUrl1(e.target.value)}
                    ></input>
                </label>
                {errors.previewImage && <div className='errors'>{errors.previewImage}</div>}
                <label>
                    <input
                        type="url"
                        placeholder='Preview Image URL'
                        value={url2}
                        onChange={(e) => setUrl2(e.target.value)}
                    ></input>
                    </label>
                    <label>
                    <input
                        type="url"
                        placeholder='Preview Image URL'
                        value={url3}
                        onChange={(e) => setUrl3(e.target.value)}
                    ></input>
                    </label>
                    <label>
                    <input
                        type="url"
                        placeholder='Preview Image URL'
                        value={url4}
                        onChange={(e) => setUrl4(e.target.value)}
                    ></input>
                    </label>
                    <label>
                    <input
                        type="url"
                        placeholder='Preview Image URL'
                        value={url5}
                        onChange={(e) => setUrl5(e.target.value)}
                    ></input>
                </label>
                <button disabled={!country.length}>Create Spot</button>
            </form>
        </>
    )
}
