import styled from "styled-components";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Frame = styled.div`
  width: 100%;
  height: 100vh;
  border: 1px solid black;
  margin: 100vh 0;

  & .cursor {
    display: none;
    width: 120px;
    height: 120px;
    background-color: red;
  }
`;

const CursorSection = () => {
  const frameRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {}, {
    scope: frameRef.current as HTMLDivElement,
  });

  useEffect(() => {
    if (!frameRef.current) return;
    const frame = frameRef.current;
    const cursor = frame.querySelector(".cursor") as HTMLElement;

    const mouseEnterEvent = () => {
      cursor.style.display = "flex";
    };
    const mouseLeaveEvent = () => {
      cursor.style.display = "none";
    };

    frame.addEventListener("mouseenter", mouseEnterEvent);
    frame.addEventListener("mouseleave", mouseLeaveEvent);

    return () => {
      frame.removeEventListener("mouseenter", mouseEnterEvent);
      frame.removeEventListener("mouseleave", mouseLeaveEvent);
    };
  }, []);

  return (
    <Frame ref={frameRef}>
      <div className="cursor" />
    </Frame>
  );
};

export default CursorSection;
