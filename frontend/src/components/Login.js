import React from 'react';
import { Container } from 'react-bootstrap';

const authEndpoint = 'https://accounts.spotify.com/authorize';
const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
const scopes = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
];
const state = 'xyz';

const AUTH_URL = `${authEndpoint}?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scopes.join(
  '%20'
)}&state=${state}`;

export default function Login() {
  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <a href={AUTH_URL} className='btn btn-outline-success btn-lg'>
        Login in Spotify
      </a>
    </Container>
  );
}
