import styled from "styled-components";

export const ResultWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    max-width: 1000px;
    width: 100%;
    margin-top: auto;
  }

  h2 {
    font-size: 48px;
    letter-spacing: 12px;
    margin-block: 0 1rem;
  }
`

export const GridWrapperStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  row-gap: 1rem;
`