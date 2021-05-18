import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: relative;
  height: 100%;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
`;

export const RedLines = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

export const RedBorderImage = styled.img`
  width: 100px;
  height: 100px;
  border: 2px solid red;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Column = styled.div`
  display: flex;
`;
