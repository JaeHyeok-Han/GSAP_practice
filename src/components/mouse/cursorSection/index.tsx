import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import styled from "styled-components";

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
    display: flex;
    width: 120px;
    height: 120px;
    background-color: red;
    pointer-events: none;
    transition: transform 0.05s;
  }
`;

const CursorSection = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const lastX = useRef<number>(0);
  const lastY = useRef<number>(0);

  useGSAP(
    () => {
      const frame = frameRef.current as HTMLElement;
      const cursor = frame.querySelector(".cursor") as HTMLElement;

      gsap.to(cursor, {
        display: "flex",
        scrollTrigger: {
          trigger: frame,
          start: "top bottom",
          end: "bottom top",
        },
      });

      const scrollEvent = () => {
        const { x, y } = frame.getBoundingClientRect();
        cursor.style.transform = `translate(calc(${
          lastX.current - x
        }px - 50%), calc(${lastY.current - y}px - 50%))`;
      };

      const mouseMoveEvent = (e: MouseEvent) => {
        const { x, y } = frame.getBoundingClientRect();
        const { clientX, clientY } = e;
        lastX.current = clientX;
        lastY.current = clientY;

        cursor.style.transform = `translate(calc(${
          clientX - x
        }px - 50%), calc(${clientY - y}px - 50%))`;
      };

      ScrollTrigger.create({
        trigger: frame,
        start: "top bottom",
        end: "bottom top",
        markers: true,
        onUpdate: () => {
          scrollEvent();
        },
        onToggle: (e) => {
          if (e.isActive) frame.addEventListener("mousemove", mouseMoveEvent);
          else frame.removeEventListener("mousemove", mouseMoveEvent);
        },
      });
    },
    {
      scope: frameRef.current as HTMLElement,
    }
  );

  return (
    <Frame ref={frameRef}>
      <div className="cursor" />
    </Frame>
  );
};

export default CursorSection;
