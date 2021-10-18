import React from 'react';
import { StyledDetails } from './styles/StyledDetails';
import ReactAudioPlayer from 'react-audio-player';

const TrackDetails = ({ track, onClick }) => {
  const msToTime = (duration) => {
    let ms = duration % 1000;
    duration = (duration - ms) / 1000;
    let seconds = duration % 60;
    duration = (duration - seconds) / 60;
    let minutes = duration % 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
  };

  let bgimg;
  if (track.bigImg) {
    bgimg = `url(${track.bigImg.url ? track.bigImg.url : track.bigImg})`;
  }
  // track && console.log(track);
  return (
    <StyledDetails>
      {track && (
        <table
          style={{
            height: '100%',
            backgroundImage: bgimg,
          }}
        >
          <tbody>
            <tr>
              <td>
                <h2>
                  <span
                    className='clickeable'
                    onClick={() => onClick(track.title)}
                  >
                    {track.title}
                  </span>
                </h2>
                {track.albumName && (
                  <h5>
                    <span
                      className='clickeable'
                      onClick={() => onClick('Album/' + track.albumName)}
                    >
                      {track.albumName}
                    </span>
                  </h5>
                )}
                {track.artist && (
                  <span
                    className='clickeable'
                    onClick={() => onClick('Artist/' + track.artist)}
                  >
                    {track.artist}
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td>
                {track.genres &&
                  track.genres.map((genre, i) => (
                    <p key={i}>
                      <span>{genre}</span>
                    </p>
                  ))}
                {track.numTracks && <span>{`Tracks: ${track.numTracks}`}</span>}
              </td>
            </tr>
            <tr>
              <td>
                {track.release && track.duration && (
                  <span>
                    {`${track.release} | Duration: ${msToTime(track.duration)}`}
                  </span>
                )}
                {track.followers && (
                  <span>{`Followers: ${track.followers}`}</span>
                )}
                {track.preview && (
                  <div className='mt-4'>
                    <ReactAudioPlayer
                      src={track.preview}
                      controls
                      volume={0.2}
                    />
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </StyledDetails>
  );
};
// Re-render only when prop 'track' changes
export default React.memo(
  TrackDetails,
  (prevProps, nextProps) => prevProps.track === nextProps.track
);
