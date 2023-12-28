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

export const ResultWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    max-width: 1000px;
    width: 100%;
    margin-top: auto;
  }
`

export const ConfigWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-top: 1rem;
    max-width: 1000px;
    width: 100%;
  }

  button > span {
    position: absolute;
  }
`

export const SubWrapperStyled = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  justify-content: center;
  gap: 2rem;

  & > div, & > div > div {
    max-height: 40px;
  }

  label {
    line-height: 1;
  }
`

export const SettingsWrapperStyled = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 2rem;
  row-gap: 1rem;
  margin: 0 auto;

  .MuiAutocomplete-inputRoot {
    max-height: 40px;
  }

  .MuiAutocomplete-endAdornment {
    top: calc(50% - 25px);
  }

  label {
    line-height: 1;
  }
`

export const TitleGridWrapperStyled = styled.span`
  font-size: 32px;
  text-align: right;
  height: fit-content;
`

export const GridWrapperStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`
