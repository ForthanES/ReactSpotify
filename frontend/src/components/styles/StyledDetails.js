import styled from 'styled-components';

export const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;

  table {
    width: 100%;
    height: 100%;
    text-align: center;
    background-size: cover;
  }

  td span {
    background: rgba(0, 0, 0, 0);
    color: white;
    text-shadow: 0px 0px 12px black, 0px 0px 8px black, 0px 0px 4px black;
    font-weight: bold;
  }

  td div {
    padding-top: 5px;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .clickeable {
    cursor: pointer;
  }

  .clickeable:hover {
    color: #1db954;
  }
`;
