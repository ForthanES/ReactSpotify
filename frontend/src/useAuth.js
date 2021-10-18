import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refressToken, setRefressToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post('http://localhost:3001/login', { code })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefressToken(res.data.refressToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, '/');
      })
      .catch(() => {
        window.location = '/';
      });
  }, [code]);

  useEffect(() => {
    if (!refressToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post('http://localhost:3001/refresh', { refressToken })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location = '/';
        });
    }, (expiresIn - 60) * 1000);

    return () => clearTimeout(interval);
  }, [refressToken, expiresIn]);

  return accessToken;
}
