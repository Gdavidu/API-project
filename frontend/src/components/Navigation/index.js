import React from 'react';
import {  useHistory } from 'react-router-dom';
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
          <img className='airbnbicon' src='https://res.cloudinary.com/ddsopojwd/image/upload/v1691380427/2111320_bnbtux.png' alt='icon supposed to load'/>
          <div className='appname'>Getaways</div>
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
