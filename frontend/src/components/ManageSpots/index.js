import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentSpots } from '../../store/spots';
import React from "react";
import {useHistory, NavLink} from 'react-router-dom'
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal';

export default function GetCurrentSpots() {
    const spots = useSelector((state) => (state.spots ? state.spots: {}))
    const spotsArr = Object.values(spots.allSpots)
    const dispatch = useDispatch();
    const history = useHistory()


    useEffect(() => {
        dispatch(fetchCurrentSpots());
    }, [dispatch,spotsArr]);

    return (
        <>
        <h1>Manage Spots</h1>
        {spotsArr.length<=0 ? (<NavLink exact to="/spots/new">Create a Spot</NavLink>): null}
        {spotsArr.map((spot) => {
                return (
                    <div className="tooltip-wrap">
                        <div className="spotscontainer">
                            <div className="tooltip-content">
                                {spot.name}
                            </div>

                            <li key={spot.id} onClick={()=>{history.push(`/${spot.id}`)}}>
                                <img src={spot.previewImage} alt='No Images Found' />
                                <div className='spotinfo'>
                                    <div className='stars'>
                                        {spot.avgRating ? <><div className='rating'>{spot.avgRating}</div>
                                            <div className='icon'><i className="fa-solid fa-star fa-xs" style={{ color: 'black' }}></i>
                                            </div></> : <div>New!</div>}
                                    </div>
                                    <div className='location'>
                                        {spot.city}, {spot.state}
                                    </div>
                                    <div className='price'>
                                        ${spot.price} night
                                    </div>
                                </div>
                            </li>
                                <button onClick={()=>{history.push(`/spots/update/${spot.id}`)}}>Update</button>
                                <div className='deleteModal'>
                                <OpenModalButton
                                        buttonText="Delete"
                                        modalComponent={<DeleteSpotModal spot={spot}/>}
                                        />
                                        </div>

                        </div>
                    </div>
                )
            })}
        </>
    )
}
