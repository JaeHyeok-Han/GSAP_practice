import styled from "styled-components";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Frame = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  border: 1px solid black;
  overflow: hidden;

  & .cursor {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    width: 120px;
    height: 120px;
    background-color: red;
    pointer-events: none;
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
    const mouseMoveEvent = (e: MouseEvent) => {
      const { x, y } = frame.getBoundingClientRect();
      const { clientX, clientY } = e;

      cursor.style.transform = `translate(calc(${clientX - x}px - 50%), calc(${
        clientY - y
      }px - 50%))`;
    };

    frame.addEventListener("mouseenter", mouseEnterEvent);
    frame.addEventListener("mouseleave", mouseLeaveEvent);
    frame.addEventListener("mousemove", mouseMoveEvent);

    return () => {
      frame.removeEventListener("mouseenter", mouseEnterEvent);
      frame.removeEventListener("mouseleave", mouseLeaveEvent);
      frame.removeEventListener("mousemove", mouseMoveEvent);
    };
  }, []);

  return (
    <Frame ref={frameRef}>
      <div className="cursor" />
    </Frame>
  );
};

export default CursorSection;
