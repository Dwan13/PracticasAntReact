
import React, { useState, useEffect } from "react";
import Ring from "./slotMachine/Ring";

const DealCasino: React.FC = () => {
  const testMarcas = [
    { name: "ZI" },
    { name: "ZD" },
    { name: "ZR" },
    { name: "ZT" },
    { name: "AL" },
    { name: "ZL" },
    { name: "ET" }
  ];

  const [rotationSeeds, setRotationSeeds] = useState<number[]>([]);
  const [dotAnimation, setdotAnimation] = useState(false);
  useEffect(() => {
    spin(2);
    const intervalId = setInterval(() => spin(2), 5000);
    return () => clearInterval(intervalId);
  }, []);

  const getSeed = (): number => Math.floor(Math.random() * testMarcas.length);

  const fetchEqualArr = (seeds: number[]): boolean => seeds.length > 0 && seeds.every((seed) => seed === seeds[0]);

  const spin = (timer: number): void => {
    let updatedRotationSeeds = rotationSeeds.map((oldSeed) => {
      let seed = getSeed();
      while (oldSeed === seed) {
        seed = getSeed();
      }
      return seed;
    });

    while (fetchEqualArr(updatedRotationSeeds.slice(0, 3))) {
      updatedRotationSeeds = [getSeed(), getSeed(), getSeed()];
    }

    setRotationSeeds(updatedRotationSeeds);
  };

  const renderDots = (count: number, modify: string): JSX.Element[] => (
    Array.from({ length: count }, (_, index) => (
      <div
        key={index}
        className={`casino__dot ${!!dotAnimation ? "scaleIN" : ""}`}
      />
    ))
  );

  return (
    <div className={`casino__container`}>
      <div className="casino__body">
        {renderDots(8, "top")}
        {renderDots(1, "left")}
        <div className="casino__items">
          <div className="casino__slot">
            <Ring Brands={testMarcas} Seed={rotationSeeds[0] || 0} Index={0} />
          </div>
          <div className="casino__slot">
            <Ring Brands={testMarcas} Seed={rotationSeeds[1] || 0} Index={1} />
          </div>
          <div className="casino__slot">
            <Ring Brands={testMarcas} Seed={rotationSeeds[2] || 0} Index={2} />
          </div>
        </div>
        {renderDots(1, "right")}
        {renderDots(8, "botton")}
      </div>
    </div>
  );
}

export default DealCasino;
