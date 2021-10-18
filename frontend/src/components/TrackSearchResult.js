import React from 'react';
import { StyledTrack } from './styles/StyledTrack';

const TrackSearchResult = ({ track, onClick }) => {
  return (
    <StyledTrack
      className='d-flex m-2 align-content-center'
      style={{ cursor: 'pointer' }}
      onClick={() => onClick({ track })}
    >
      {track.albumUrl && (
        <img
          src={track.albumUrl.url ? track.albumUrl.url : track.albumUrl}
          style={{ height: '64px', width: '64px' }}
          alt={track.title + ' image'}
        />
      )}

      <div className='ms-3'>
        <div>{track.title}</div>
        <div className='text-muted'>{track.artist}</div>
      </div>
    </StyledTrack>
  );
};

export default React.memo(
  TrackSearchResult,
  (prevProps, nextProps) => prevProps.track === nextProps.track
);
