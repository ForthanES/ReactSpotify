import styled from 'styled-components';

export const StyledTrack = styled.div`
  position: relative;
  padding: 4px;
  color: white;
  border: 2px solid transparent;
  border-radius: 5px;

  :hover {
    border: 2px solid #1db954;
    box-shadow: 2px 2px 5px #151;
    top: -5px;
    left: -5px;
  }

  img {
    border-radius: 10px;
  }
`;
