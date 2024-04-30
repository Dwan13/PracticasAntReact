import React from "react";

interface SlotProps {
  Index: number;
  Name: string;
  SlotAngle: number;
}

const Slot: React.FC<SlotProps> = ({ Index, Name, SlotAngle }) => {
  const REEL_RADIUS = 100;
  const transform = `rotateX(${SlotAngle * Index}deg) translateZ(${REEL_RADIUS}px)`;

  return (
    <li style={{ transform }}>
      <picture>
        <source
          className=""
          data-srcset={`/buildoutlet/images/agencies/${Name}/${Name}.webp`}
          type="image/webp"
        />
        <img
          className="lazyload agencies__item__img"
          data-src={`/buildoutlet/images/agencies/${Name}/${Name}.png`}
          alt={`${Name}`}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        />
      </picture>
    </li>
  );
};

export default Slot;
