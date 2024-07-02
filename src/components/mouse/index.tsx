"use client";

import styled from "styled-components";
import CursorSection from "./cursorSection";

const Frame = styled.div`
  & .spacing {
    width: 100%;
    height: 110vh;
  }
`;

const Mouse = () => {
  return (
    <Frame>
      <div className="spacing" />
      <CursorSection />
      <div className="spacing" />
    </Frame>
  );
};
export default Mouse;
