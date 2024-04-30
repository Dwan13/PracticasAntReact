"use client";
import React, { useState } from "react";
import bigInt from "big-integer";
import Style from "./style.module.sass";
import EulerPhiSteps from "./Euler";
import TextCifrate from "./textCifrate";
import { Select } from "antd";

const RSAKeyGenerator = () => {
  // Define los estados para los valores de p, q, claves pública y privada, mensajes, etc.
  const [p, setP] = useState("");
  const [q, setQ] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [n, setN] = useState<bigInt.BigInteger>(bigInt.zero);
  const [d, setD] = useState<bigInt.BigInteger>(bigInt.zero);
  const [e, setE] = useState<bigInt.BigInteger>(bigInt.zero);
  const [phiN, setPhiN] = useState<bigInt.BigInteger>(bigInt.zero);
  const [selectedEValues, setSelectedEValues] = useState<bigInt.BigInteger[]>(
    []
  );
  const [selectedCheckbox, setSelectedCheckbox] = useState("1");

  // Función para generar las claves RSA
  const handleRange = () => {
    const parsedP = bigInt(p);
    const parsedQ = bigInt(q);

    if (!parsedP.isProbablePrime() || !parsedQ.isProbablePrime()) {
      alert("p y q deben ser números primos");
      return;
    }

    // Calcular n = p * q
    const n = parsedP.multiply(parsedQ);
    setN(n);

    // Calcular φ(n) = (p - 1) * (q - 1)
    const phiN = parsedP.subtract(1).multiply(parsedQ.subtract(1));
    setPhiN(phiN);

    // Generar números e dentro del rango
    const eValues = [];
    // Ciclo para generar números y almacenarlos en el array
    for (let i = bigInt(2); i.compare(phiN) < 0; i = i.add(1)) {
      if (bigInt.gcd(i, phiN).compare(1) === 0) {
        eValues.push(i);
      }
    }
    setSelectedEValues(eValues);
  };

  const handleGenerateKeys = () => {
    // Calcular d, el inverso multiplicativo de e módulo φ(n)
    const d = e.modInv(phiN);
    setD(d);
    // Actualizar el estado con las claves generadas
    setPublicKey(e.toString());
    setPrivateKey(d.toString());
  };

  const handleCheckboxChange = (event: any) => {    
    setE(bigInt(event));
    setSelectedCheckbox(event);
  };

  const handleClear = () => {
    setP("");
    setQ("");
    setPublicKey("");
    setPrivateKey("");
    setN(bigInt.zero);
    setD(bigInt.zero);
    setE(bigInt.zero);
    setPhiN(bigInt.zero);
    setSelectedEValues([]);
    setSelectedCheckbox('1');
  };
  return (
    <div className={`${Style.template}`}>
      <EulerPhiSteps></EulerPhiSteps>
      <div className={Style.divider}></div>
      <h2>Generador de Claves RSA</h2>
      <div className={Style.labels}>
        <label>
          Valor de p:
          <input type="text" value={p} onChange={(e) => setP(e.target.value)} />
        </label>

        <label>
          Valor de q:
          <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
      </div>

      <button onClick={handleRange}>Generar φ(n)</button>

      <div className={`${Style.steps}`}>
        {n.gt(bigInt.zero) && (
          <>
            <h3>Calcular n = p * q</h3>
            <p>{n.toString()}</p>
          </>
        )}
        {phiN.gt(bigInt.zero) && (
          <>
            <h3>Calcular φ(n) = (p - 1) * (q - 1)</h3>
            <p>{phiN.toString()}</p>
          </>
        )}
        {selectedEValues.length > 0 && (
          <>
            <h3>
              Elegir un número e tal que 1 &lt; e &lt; φ(n) y que sea coprimo
              con φ(n)
            </h3>

            <div className={Style.selectedEValues}>
              <Select
                showSearch
                style={{ width: 400 }}
                placeholder="Busque un número"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                onChange={handleCheckboxChange}
                options={selectedEValues
                  .map((data) => ({
                    value: parseInt(data.toString(), 10),
                    label: data.toString()
                  }))
                }
              />
            </div>
          </>
        )}
        {d.gt(bigInt.zero) && (
          <>
            <h3>Calcular d, el inverso multiplicativo de e módulo φ(n)</h3>
            <p>{d.toString()}</p>
          </>
        )}
        <button onClick={handleGenerateKeys}>Generar Claves</button>

        {publicKey && (
          <div className={Style.key}>
            <h3>Clave Pública (e):</h3>
            <p>{`[n = ${n.toString()}, e = ${publicKey}]`}</p>
          </div>
        )}
        {privateKey && (
          <div className={Style.key}>
            <h3>Clave Privada (d):</h3>
            <p>{`[n = ${n.toString()}, d = ${privateKey}]`}</p>
          </div>
        )}
      </div>
      <div className={Style.divider}></div>

      <TextCifrate n={n} d={d} e={e}  />
      <button onClick={handleClear}>Limpiar</button>

    </div>
  );
};

export default RSAKeyGenerator;
