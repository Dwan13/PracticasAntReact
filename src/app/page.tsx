import Image from "next/image";
import styles from "./page.module.css";
import EulerPhiSteps from "app/components/euler/Euler";
import RSAKeyGenerator from "app/components/euler/keyPair";
import Snake from "app/components/snake/Snake";

export default function Home() {
  return (
    <main className={styles.main}>
        <RSAKeyGenerator></RSAKeyGenerator>
    </main>
  );
}
