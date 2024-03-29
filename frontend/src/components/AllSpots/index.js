import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import './AllSpots.css'
import React from "react";
import { useHistory } from 'react-router-dom'

export default function GetAllSpots() {
    const spots = useSelector((state) => (state.spots ? state.spots : {}))
    const spotsArr = Object.values(spots.allSpots)
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);


    return (
        <>
<div className='page'>
<div  className="spotscontainer">
            {spotsArr.map((spot) => {
                return (

                    <div key={spot.id} className="tooltip-wrap">
                        <div className="tooltip-content">
                                {spot.name}
                        </div>
                        <div  className='spotClickable' onClick={() => {
                            history.push(`/${spot.id}`)
                            }}>
                            <img src={spot.previewImage} alt='No Images Found' />
                            <div className='spotinfo'>
                                <div className='topBar'>
                                <div className='location'>
                                    {spot.city}, {spot.state}
                                </div>
                                <div className='stars'>
                                    {spot.avgRating ? <><div className='rating'>{spot.avgRating}</div>
                                        <div className='icon'><i className="fa-solid fa-star fa-xs" style={{ color: 'black' }}></i>
                                        </div></> : <div>New!</div>}
                                </div>
                                </div>
                                <div className='price'>
                                    ${spot.price} night
                                 </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
            </div>

        </>
    )
}
