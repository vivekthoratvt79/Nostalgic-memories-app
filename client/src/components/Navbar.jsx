import React, { useState, useEffect } from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if(decodedToken.exp *1000 < new Date().getTime()) handleLogout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    setUser(null);
  };
  return (
    <>
      <Header as='h2' block textAlign='center' className='main-header'>
        <div className='navbar-auth-head' style={{ lineHeight: 'initial' }}>
          {user ? (
            <>
              <Icon
                name='user circle'
                className='login-logout-btn'
                onClick={handleLogout}
              />
              <p
                style={{ fontSize: '10px', textAlign: 'center' }}
                onClick={handleLogout}
                className='login-logout-btn'
              >
                Logout
              </p>
            </>
          ) : (
            <>
              <Icon
                name='user circle'
                color='grey'
                className='login-logout-btn'
                onClick={handleLogin}
              />
              <p
                style={{ fontSize: '10px', color: 'grey', textAlign: 'center' }}
                onClick={handleLogin}
                className='login-logout-btn'
              >
                Login
              </p>
            </>
          )}
        </div>
        Nostalgic - Memories
        <Header.Subheader>
          Share & re-live your memories with us <Icon name='smile outline' />
        </Header.Subheader>
      </Header>
    </>
  );
};

export default Navbar;
