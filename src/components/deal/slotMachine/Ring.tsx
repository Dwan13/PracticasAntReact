import React, { useState, useEffect } from "react";
import Slot from "./Slot";

interface Brand {
  name: string;
}

interface RingProps {
  Brands: Brand[];
  Seed: number;
  Index: number;
}

const Ring: React.FC<RingProps> = ({ Brands, Seed, Index }) => {
  useEffect(() => {
    createSlots();
  }, [Brands]);

  const createSlots = () => {
    const slots = Brands.map((brand, index) => (
      <Slot
        key={index}
        Index={index}
        SlotAngle={Math.round(360 / Brands.length)}
        Name={brand.name}
      />
    ));
    setSlots(slots);
  };

  const [slots, setSlots] = useState<JSX.Element[]>([]);

  return <ul className={`ring spin-${Seed}`}>{slots}</ul>;
};

export default Ring;
