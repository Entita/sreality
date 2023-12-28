import styled from "styled-components";

export const SvgStyled = styled.svg`
  transform-origin: 0 0;

  .area-cover {
    fill: #fff;
    stroke: #ccc;
    stroke-width: 2;
    cursor: pointer;
    stroke-linejoin: round;
  }

  .area-cover.active {
    fill: #c00;
  }

  .area-cover.active .caption {
    fill: white;
  }

  .area-cover:hover:not(.active) {
    fill: #e8e8e8;
  }

  .caption {
    fill: #000;
    text-anchor: middle;
    stroke: none;
    -webkit-tap-highlight-color: transparent;
    font-size: 16px;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    font-stretch: normal;
    font-family: Arial,Helvetica,sans-serif;
    line-height: normal;
    cursor: pointer;
    user-select: none;
    pointer-events: none;
  }
`