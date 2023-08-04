import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }, {user}) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  return (
    <>
      <nav>
        <div className='logo' onClick={()=>{history.push('/')}}>
          <img className='airbnbicon' src='https://cdn.icon-icons.com/icons2/2108/PNG/512/airbnb_icon_131000.png' alt='icon supposed to load'/>
          <div className='appname'>Airbnb</div>
        </div>
        <ul>
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
