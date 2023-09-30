// Homework 5.5 CSS transition
import React, { useRef } from "react";
import "./FancyAnimation.css";

export const FancyAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { clientX: x, clientY: y } = e;
    const letters = containerRef.current.children;

    for (const letter of letters as any) {
      const { left, top, width, height } = letter.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = x - centerX;
      const deltaY = y - centerY;

      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (distance < 300) {
        const angle = Math.atan2(deltaY, deltaX);
        const offset = 500 - distance;
        letter.style.transform = `translate(${Math.cos(angle) * offset}px, ${
          Math.sin(angle) * offset
        }px)`;
      } else {
        letter.style.transform = "";
      }
    }
  };

  return (
    <div className="container" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="word">
        {Array.from("Caleb").map((letter, index) => (
          <span
            key={index}
            className={`letter letter-${index}`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};
