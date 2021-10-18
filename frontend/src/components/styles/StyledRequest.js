import styled from 'styled-components';

export const StyledRequest = styled.div`
  padding: 2vh 2vw;
  background-color: #222326;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #1db954;
  }

  .form-control {
    position: fixed;
    width: 35%;
    z-index: 2;
  }
`;
