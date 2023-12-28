import styled from "styled-components";

export const WrapperStyled = styled.div`
  display: flex;
  width: 200%;

  & > div {
    padding: 12px 2rem 0 2rem;
    width: 100%;
    min-height: calc(100vh - 14px);
    transition: transform .6s ease;
    transform: ${({ page }) => `translateX(-${100 * page}%)`};
  }
`
