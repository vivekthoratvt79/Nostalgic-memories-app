import React, { useEffect, useState } from 'react';
import { Button, Form, Segment, Grid, Icon } from 'semantic-ui-react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupAction, signin } from '../actions/auth';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup, setSignup] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const handleSignup = () => {
    setSignup((prev) => !prev);
  };

  const initialState = { name: '', email: '', password: '', cpassword: '' };
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = formData;
    if (signup) {
      if (password !== cpassword) {
        setErrorMsg('Password does not match');
        return false;
      }
      dispatch(signupAction(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (err) => {
    console.log(err);
    console.log('error while signing in');
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          '1042242333290-rec6c424mb8si817egmnln57seopsncg.apps.googleusercontent.com',
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  return (
    <Grid
      textAlign='center'
      relaxed='very'
      doubling
      style={{ height: '90vh' }}
      padded='horizontally'
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 500 }}>
        <Button
          className='go-to-home'
          basic
          fluid
          color='teal'
          style={{ width: '100%' }}
          onClick={() => navigate('/')}
        >
          &nbsp;&nbsp;Go to News Feed&nbsp;
        </Button>
        <Form size='large' className='post-form' onSubmit={handleSubmit}>
          <Segment stacked>
            {signup && (
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Name'
                name='name'
                onChange={handleChange}
                required
              />
            )}
            <Form.Input
              fluid
              icon='envelope'
              iconPosition='left'
              placeholder='Email ID'
              name='email'
              type='email'
              onChange={handleChange}
              required
            />
            <Form.Input
              fluid
              icon='key'
              iconPosition='left'
              placeholder='Password'
              name='password'
              type='password'
              onChange={handleChange}
              required
            />
            {signup && (
              <Form.Input
                fluid
                icon='key'
                iconPosition='left'
                placeholder='Confirm Password'
                name='cpassword'
                type='password'
                onChange={handleChange}
                required
              />
            )}
            <span style={{ color: 'red', fontSize: '12px' }}>{errorMsg}</span>
            <Form.Field>
              {signup ? (
                <Button
                  color='teal'
                  fluid
                  size='large'
                  name='signup'
                  type='submit'
                >
                  Signup
                </Button>
              ) : (
                <Button
                  color='teal'
                  fluid
                  size='large'
                  name='login'
                  type='submit'
                >
                  Login
                </Button>
              )}
            </Form.Field>
            <Form.Field>
              <GoogleLogin
                clientId='1042242333290-rec6c424mb8si817egmnln57seopsncg.apps.googleusercontent.com'
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={'single_host_origin'}
                render={(renderProps) => (
                  <Button
                    basic
                    color='orange'
                    fluid
                    size='large'
                    onClick={renderProps.onClick}
                    // disabled={renderProps.disabled}
                  >
                    <Icon name='google'></Icon>Sign in with Google
                  </Button>
                )}
              />
            </Form.Field>
            {!signup && (
              <Form.Field>
                Don't have an account with us?{' '}
                <span
                  style={{ cursor: 'pointer', color: 'blue' }}
                  onClick={handleSignup}
                >
                  &nbsp;&nbsp;Sign Up
                </span>
              </Form.Field>
            )}
            {signup && (
              <Form.Field>
                Already have an account with us?{' '}
                <span
                  style={{ cursor: 'pointer', color: 'blue' }}
                  onClick={handleSignup}
                >
                  &nbsp;&nbsp;Log In
                </span>
              </Form.Field>
            )}
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Auth;
