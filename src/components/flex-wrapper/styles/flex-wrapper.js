import styled from 'styled-components/macro';

export const Container = styled.div`
  align-items: ${(props) => props.align};
  display: flex;
  flex-direction: ${(props) => props.direction};
  margin-top: 4.5em;


  @media (min-width:30em) {
    flex-direction: row;
  }
`;
