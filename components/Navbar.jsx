import Link from 'next/link';
import styles from '../styles/NavBar.module.css';
import { ConnectWallet } from "@thirdweb-dev/react";
import {angeldaologo} from '../assets'
import Image from "next/image";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
       <div className={styles.logo}>
        {/* Add your app logo image here */}
        <img src="/images/angeldaologo.png" alt="App Logo"
        width={75}
        height={75} />
      </div>
      <ul className={styles.navlist}>
        <li className={styles.navitem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navitem}>
          <Link href="/LockTokens">LockTokens</Link>
        </li>
        <li className={styles.navitem}>
          <Link href="/CreateCampaign">CreateCampaign</Link>
        </li>
        <li className={styles.navitem}>
          <Link href="/CampList">Campaigns</Link>
        </li>
        <li className={styles.navitem}>
          <Link href="/Wallet">Wallet/Funds</Link>
        </li>
        <li className={styles.navitem}>
          <Link href="/Profile">Profile</Link>
        </li>
        <li className={styles.navitem}>
          <Link href="/contact">Contact</Link>
        </li>
        <li className={styles.navitem}>
          <Link href="/About">About</Link>
        </li>
      </ul>

      <div className={styles.wallet}>
        <ConnectWallet
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
        />
      </div>
    </nav>
  );
};

export default NavBar;