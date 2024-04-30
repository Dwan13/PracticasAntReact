'use client';

import React, { useState } from "react";
import Style from "./style.module.sass";

const EulerPhiSteps: React.FC = () => {
  const [number, setNumber] = useState<string>("");
  const [steps, setSteps] = useState<string[]>([]);

  const calculatePhiSteps = () => {
    const n = parseInt(number);
    if (isNaN(n) || n <= 0) {
      alert("Por favor, ingresa un número entero positivo.");
      return;
    }

    const phiSteps: string[] = [];
    for (let i = 1; i <= n; i++) {
      let count = 0;
      let coprimes = [];
      for (let j = 1; j <= i; j++) {
        if (gcd(i, j) === 1) {
          count++;
          coprimes.push(j);
        }
      }
      const coprimeStr = coprimes.join(", ");
      phiSteps.push(`φ(${i}) = ${count}, coprimos: {${coprimeStr}}`);
    }
    setSteps(phiSteps);
  };

  // Máximo común divisor
  const gcd = (a: number, b: number): number => {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  };

  const handleClear = () => {
    setNumber("");
    setSteps([]);
  };

  return (
    <div className={Style.euler}>
      <h2>Indicatriz de Euler (φ)</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Ingresa un número"
      />
      <button onClick={calculatePhiSteps}>Calcular</button>
      {steps.length > 0 && (
        <div className={Style.steps_primos}>
          <h3>Coprimos:</h3>
          <ul>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
          <button onClick={handleClear}>Limpiar</button>

        </div>
      )}
    </div>
  );
};

export default EulerPhiSteps;
