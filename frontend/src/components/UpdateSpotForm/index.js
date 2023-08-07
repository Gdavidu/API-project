import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSpotDetail, updateSpot } from '../../store/spots';
import './UpdateSpotForm.css'
export default function UpdateSpotForm() {
    const spot = useSelector((state) => (state.spots ? state.spots.singleSpot : {}))
    const [country, setCountry] = useState(spot.country ? spot.country : '');
    const [address, setAddress] = useState(spot.address ? spot.address : '');
    const [city, setCity] = useState(spot.city ? spot.city : '');
    const [state, setState] = useState(spot.state ? spot.state : '');
    const [lat, setLat] = useState(spot.lat ? spot.lat : '')
    const [lng, setLng] = useState(spot.lng ? spot.lng : '')
    const [description, setDescription] = useState(spot.description ? spot.description : '');
    const [name, setName] = useState(spot.name ? spot.name : '');
    const [price, setPrice] = useState(spot.price ? spot.price : '');
    const [errors, setErrors] = useState({});
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    // localStorage.setItem("country", country)
    // localStorage.setItem("country", country)
    // localStorage.setItem("country", country)
    // localStorage.setItem("country", country)
    useEffect(() => {
        dispatch(fetchSpotDetail(id));
    }, [dispatch, id]);
    // useEffect(() => {
    //     setCountry(localStorage.getItem("country"))
    // }, []);
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (description.length < 30) {
            return setErrors({ description: "Description needs a minimum of 30 characters" })
        }

        const editedSpot = { ...spot, country, address, city, state, description, lat, lng, name, price }
        console.log('editedSpot', editedSpot)


        const sentSpot = await dispatch(updateSpot(editedSpot))
        if (sentSpot.errors) {
            setErrors(sentSpot.errors);
        } else {
            history.push(`/${sentSpot.id}`);
        }

        // console.log('spotdetails from fewtchSpotDetail', spot)
    }
    if (!(Object.values(spot).length > 0)) {
        return null
    }
    return (
        <>
            <div className='formContainer'>
            <form className='form' onSubmit={handleOnSubmit}>
            <div className='bottomBorders'>
                <h1>Update Your Spot</h1>
                <h3>{"Where's your place located?"}</h3>
                <h4>Guests will only get your exact address once they booked a
                    reservation.
                </h4>
                <label className='label'>Country
                </label>
                <input
                className='input'
                    type="text"
                    placeholder='Country'
                    value={country}
                    onChange={(e) => {
                        setCountry(e.target.value)
                    }}
                ></input>
                {errors.country && <div className='errors'>{errors.country}</div>}
                <label className='label'>Street Address
                </label>
                <input type="text"
                className='input'
                    placeholder='Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                ></input>
                {errors.address && <div className='errors'>{errors.address}</div>}
                <label className='label'>City
                </label>
                <input
                className='input'
                    type="text"
                    placeholder='City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                ></input>
                {errors.city && <div className='errors'>{errors.city}</div>}
                <label className='label'>
                    State
                </label>
                <input
                className='input'
                    type="text"
                    placeholder='State'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                ></input>
                {errors.state && <div className='errors'>{errors.state}</div>}
                <label className='label'>
                    Latitude
                </label>
                <input
                className='input'
                    type="text"
                    placeholder='Latitude'
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                ></input>
                {errors.lat && <div className='errors'>{errors.lat}</div>}
                <label className='label'>
                    Longitude
                </label>
                <input
                className='input'
                    type="text"
                    placeholder='Longitude'
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                ></input>
                {errors.lng && <div className='errors'>{errors.lng}</div>}
                </div>
                <div className='bottomBorders'>
                <h3>Describe your place to guests</h3>
                <label className='label'>Mention the best features of your space, any special amentities like
                    fast wifi or parking, and what you love about the neighborhood.
                </label>
                <input
                className='input'
                    type="text"
                    placeholder='Please write at least 30 characters'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></input>
                {errors.description && <div className='errors'>{errors.description}</div>}
                </div>
                <div className='bottomBorders'>
                <h3>Create a title for your spot</h3>
                <label className='label'>Catch guests' attention with a spot title that highlights what makes
                    your place special.
                </label>
                <input
                className='input'
                    type="text"
                    placeholder='Name of your spot'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
                {errors.name && <div className='errors'>{errors.name}</div>}
                </div>
                <div className='bottomBorders'>
                <h3>Set a base price for your spot</h3>
                <label className='label'>Competitive pricing can help your listing stand out and rank higher
                    in search results
                </label>
                <div className='priceContainer'>
                    $ <input
                    className='input'
                        type="price"
                        placeholder='Price per night (USD)'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></input>
                    {errors.price && <div className='errors'>{errors.price}</div>}
                    </div>
                    </div>
                <div className='btnContainer'>
                <button id='createSpot'>Update your Spot</button>
                </div>
            </form>
            </div>
        </>
    )
}
