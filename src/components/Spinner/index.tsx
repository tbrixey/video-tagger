import styled, { keyframes } from "styled-components";

const rotate = keyframes`
to {
  stroke-dashoffset: -264;
}
`;

const SpinnerSVG = styled.svg`
  circle {
    fill: none;
    stroke: slategray;
    stroke-width: 16;
    stroke-linecap: round;
    stroke-dasharray: 0, 0, 70, 194;
    stroke-dashoffset: 0;
    animation: ${rotate} 1s infinite linear;
  }
`;

export function Spinner() {
  return (
    <SpinnerSVG viewBox="0 0 100 100" width="20" height="20">
      <circle cx="50" cy="50" r="42" transform="rotate(-90,50,50)" />
    </SpinnerSVG>
  );
}
