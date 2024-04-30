// Snake.tsx
"use client";
import React, { useRef, useEffect } from "react";
import styles from "./Snake.module.sass";

interface BoxProps {
    children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ children }) => {
  const foreignObjectRef = useRef<SVGForeignObjectElement>(null);

  useEffect(() => {
    const foreignObject = foreignObjectRef.current;
    if (foreignObject) {
      const contentWidth = foreignObject.scrollWidth;
      const contentHeight = foreignObject.scrollHeight;
      foreignObject.setAttribute("width", `${contentWidth}`);
      foreignObject.setAttribute("height", `${contentHeight}`);
    }
  }, [children]);

  return (
    <div className={styles.container}>
      <svg viewBox="0 0 100 100" className={styles.svg}>
        <path
          className={styles.path}
          d="M5,5 Q5,0 10,0 H90 Q95,0 95,5 V95 Q95,100 90,100 H10 Q5,100 5,95 Z"
        />
        <foreignObject x="10" y="10" ref={foreignObjectRef}>
          <div className={styles.content}>
            {children}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default Box;
