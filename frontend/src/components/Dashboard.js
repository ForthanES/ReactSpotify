import React, { useState, useEffect, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import useAuth from '../useAuth';
//Components
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import TrackDetails from './TrackDetails';
import apiRequests from './apiRequests';
//Styles
import { StyledDashboard } from './styles/StyledDashboard';
import { StyledRequest } from './styles/StyledRequest';
import { StyledList } from './styles/StyledList';

const SpotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [song, setSong] = useState();

  useEffect(() => {
    if (!accessToken) return;
    SpotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let values = search.split('/').reverse();
    // console.log(values);
    let cancel = false;

    if (values[0] !== '') {
      let customSearch = SpotifyApi.searchTracks(values[0]);
      let type = 'Track';
      if (values[1]) {
        if (values[1] === 'Artist') {
          customSearch = SpotifyApi.searchArtists(values[0]);
        } else if (values[1] === 'Album') {
          customSearch = SpotifyApi.searchAlbums(values[0]);
        }
        type = values[1];
      }

      customSearch.then((res) => {
        //console.log(res);
        if (cancel) return;
        setSearchResults(apiRequests(type, res));
      });
    }

    return () => (cancel = true);
  }, [search, accessToken]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const selectSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  const selectSong = ({ track }) => {
    setSong(track);
  };

  return (
    <StyledDashboard>
      <StyledRequest>
        <Form.Control
          type='search'
          placeholder='Search Songs'
          value={search}
          onChange={(e) => handleChange(e)}
        />
        <StyledList>
          {searchResults.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              onClick={selectSong}
            />
          ))}
        </StyledList>
      </StyledRequest>
      {song && <TrackDetails track={song} onClick={selectSearch} />}
    </StyledDashboard>
  );
};

export default Dashboard;
