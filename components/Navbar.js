import Link from "next/link";
import Image from "next/image";

import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src="/images/pokeball.png" width="30" height="30" alt="PokeNext" />
        <Link href="/">
          <a><h1>PokeNext</h1></a>
        </Link>        
      </div>
      <ul className={styles.links_items}>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>Sobre</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}