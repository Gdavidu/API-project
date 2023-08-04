import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSpotDetail, updateSpot } from '../../store/spots';

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
            <form onSubmit={handleOnSubmit}>
                <h1>Update Your Spot</h1>
                <h3>{"Where's your place located?"}</h3>
                <h4>Guests will only get your exact address once they booked a
                    reservation.
                </h4>
                <label>Country
                    <input
                        type="text"
                        placeholder='Country'
                        value={country}
                        onChange={(e) => {setCountry(e.target.value)
                            }}
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
                <label>
                    Latitude
                    <input
                        type="text"
                        placeholder='Latitude'
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    ></input>
                </label>
                {errors.lat && <div className='errors'>{errors.lat}</div>}
                <label>
                    Longitude
                    <input
                        type="text"
                        placeholder='Longitude'
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                    ></input>
                </label>
                {errors.lng && <div className='errors'>{errors.lng}</div>}
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
                <button>Update your Spot</button>
            </form>
        </>
    )
}
