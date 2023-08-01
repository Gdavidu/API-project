import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <nav>
        <div className='logo'>

          <img className='airbnbicon' src='https://cdn.icon-icons.com/icons2/2108/PNG/512/airbnb_icon_131000.png' />
          <div className='appname'>Airbnb</div>
        </div>
        <ul>
          <li>
            <NavLink exact to="/">Home</NavLink>
          </li>
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
