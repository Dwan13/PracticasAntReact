"use client";
import React, { useState } from "react";
import bigInt from "big-integer";
import Style from "./style.module.sass";

interface MyObject {
  code: string;
  letter: string;
  cifrado: string;
}

type keys = {
  n: bigInt.BigInteger;
  d: bigInt.BigInteger;
  e: any;
};

const TextCifrate = ({ n, d, e }: keys) => {
  // Define los estados para los valores de p, q, claves pública y privada, mensajes, etc.
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState<MyObject[]>([]);
  const [decryptedMessage, setDecryptedMessage] = useState<MyObject[]>([]);
  const [selectedKey, setSelectedKey] = useState("public"); // Estado para controlar la selección de la clave

  // Función para cifrar el mensaje
  const handleEncryptMessage = () => {
    const messageBigInt = asciiToBigInt(message);
    setEncryptedMessage(messageBigInt);
  };

  // Función para descifrar el mensaje
  const handleDecryptMessage = () => {
    const messageBigInt = bigIntToAscii(encryptedMessage);
    setDecryptedMessage(messageBigInt);
  };

  // Función para convertir cada carácter del mensaje a su representación en código ASCII como un número grande
  const asciiToBigInt = (str: string) => {
    let result = [];
    for (let i = 0; i < str.length; i++) {
      const code = bigInt(str.charCodeAt(i).toString());
      const cifrado = code
        .modPow(selectedKey === "public" ? e : d, n)
        .toString();
      result.push({
        code: code.toString(),
        letter: str[i],
        cifrado: cifrado,
      });
    }
    return result;
  };

  // Función para convertir cada número grande cifrado de vuelta a su carácter ASCII correspondiente
  const bigIntToAscii = (code: any) => {
    let result = [];
    for (let i = 0; i < code.length; i++) {
      const cifrado = bigInt(code[i].cifrado);
      const letter = String.fromCharCode(
        cifrado.modPow(selectedKey === "public" ? d : e, n).toJSNumber()
      );
      result.push({
        code: code[i].cifrado,
        letter: letter,
        cifrado: cifrado.toString(),
      });
    }
    return result;
  };

  return (
    <div className={Style.cifrado}>
      <h2>Cifrado y Descifrado</h2>
      <label>
        Ingrese el mensaje:
        <input
          type="text"
          value={n.compare(bigInt.zero) > 0 ? message : ""}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      <div className={Style.radios}>
        <div className={Style.radio}>
          <input
            type="radio"
            id="public"
            value="public"
            checked={selectedKey === "public"}
            onChange={() => setSelectedKey("public")}
          />
          <label htmlFor="public">Clave Pública</label>
        </div>

        <div className={Style.radio}>
          <input
            type="radio"
            id="private"
            value="private"
            checked={selectedKey === "private"}
            onChange={() => setSelectedKey("private")}
          />
          <label htmlFor="private">Clave Privada</label>
        </div>
      </div>

      <button onClick={handleEncryptMessage}>Cifrar Mensaje</button>
      {encryptedMessage.length > 0 && n.compare(bigInt.zero) > 0 && (
        <div className={Style.cifrado}>
          <h3>Mensaje cifrado:</h3>
          <ul>
            {encryptedMessage.map((data, index) => (
              <li key={index}>
                {`${data.letter} -> ${data.code} ^ ${
                  selectedKey === "public" ? e : d
                } % ${n} -> ${data.cifrado}`}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={handleDecryptMessage}>Descifrar Mensaje</button>
      {decryptedMessage.length > 0 && n.compare(bigInt.zero) > 0 && (
        <div className={Style.cifrado}>
          <h3>Mensaje descifrado:</h3>
          <ul>
            {decryptedMessage.map((data, index) => (
              <li key={index}>
                {`${data.code} -> ${data.code} ^ ${
                  selectedKey === "public" ? d : e
                } % ${n} -> ${data.cifrado} -> ${data.letter}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TextCifrate;
