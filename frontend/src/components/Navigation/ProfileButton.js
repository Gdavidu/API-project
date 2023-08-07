import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import DemoLoginButton from "../DemoUserLogin";

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false)
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="leftNav">
        <button className='profileButton' onClick={openMenu}>
          <div className='dropdown' style={{ color: '#FF5A5F', fontSize: "40px" }}>
            <i className="fa-solid fa-user"></i>
          </div>
        </button>
      </div>
      <div className="userDropdown">
        <ul className={ulClassName} ref={ulRef}>
          <div className="loggedIn">
            {user ? (
              <>
                <div className="userInfo">

                  <li>Hello {user.firstName} {user.lastName}!</li>
                  <li>{user.email}</li>
                </div>
                <div className='links'>
        <div className="createSpotLink">
          <NavLink exact to="/spots/new">Create a Spot</NavLink>
        </div>
                  <li>
                    <NavLink exact to="/spots/current">Manage Spots</NavLink>
                  </li>
                  <li>
                    <button onClick={logout}>Log Out</button>
                  </li>
                </div>
              </>
            ) : (
              <>
                <div className="notLoggedIn">
                  <li>
                    <OpenModalButton
                      buttonText="Log In"
                      modalComponent={<LoginFormModal />}
                    />
                  </li>
                  <li>
                    <OpenModalButton
                      buttonText="Sign Up"
                      modalComponent={<SignupFormModal />}
                    />
                  </li>
                  <li>
                    <DemoLoginButton />
                  </li>
                </div>
              </>
            )}
          </div>
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
