import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../auth/auth'; 
import logo from '../assets/img/argentBankLogo.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth); 

  const handleLogout = () => {
    dispatch(logout());
    navigate('/sign-in'); 
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className='div-btn'>
        {token ? (
          <>
            <Link className='section-nav lnk' to="/user">
              <i className="fa fa-user-circle"></i>
              <span className="">{user?.firstName}</span>
            </Link>
            <div className='section-nav'>
              <button className="" onClick={handleLogout}>
                Sign Out
              </button>
            </div>
            
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i class="fa fa-user-circle"></i>
            <p>Sign In</p>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;