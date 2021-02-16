import styled from "styled-components";

export const Video = styled.video`
  width: 100%;
  position: absolute;
  height: 100%;
  outline: none;
  &::-webkit-media-controls-fullscreen-button {
    display: none;
  }
  &::-webkit-media-controls-timeline::-webkit-media-slider-container {
    background: red; /* works */
  }
  &::-webkit-media-controls-panel {
    display: flex !important;
    opacity: 1 !important;
  }
`;
