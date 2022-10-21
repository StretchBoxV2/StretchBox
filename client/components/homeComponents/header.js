import React from 'react';
import Logo from '../../assets/brand-logo.png';
import '../../stylesheets/header.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../reducers/userReducer';

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    fetch('/auth/login',{
      method: 'DELETE'
    })
    .then(res => {
      if (res.status === 204) {
        dispatch(clearUser(null)) 
        navigate('/')}
    })
  }
  return (
    <>
      <div className="headerContainer">
          <div className="spacer"></div>
          <img src={Logo} />
          <div className="spacer">
            {user ? 
            <>
            <>Hello, {user.username}</>
            <button className="login-logout" onClick={handleLogout}>Log out</button>
            </>
            : <button className="login-logout" onClick={() => navigate('/login')}>Sign in</button> }
          </div>
      </div>
    </>
  );
};

export default Header;
