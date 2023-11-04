import React from 'react';

import Image from "next/image";
import { profile, tagType, thirdweb } from '../assets';
import { daysLeft } from '../utils';
import styles from '../styles/FundCard.module.css'

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
  const remainingDays = daysLeft(deadline);
  
  return (
    <div className={styles.fundCard} onClick={handleClick}>
    <img src={image} alt="fund" className={styles.fundImage} />

    <div className={styles.fundInfo}>
      <div className={styles.tagContainer}>
        <img src={tagType} alt="tag" className={styles.tagIcon} />
        <p className={styles.tagText}>Education</p>
      </div>

      <div className={styles.fundDetails}>
        <h3 className={styles.fundTitle}>{title}</h3>
        <p className={styles.fundDescription}>{description}</p>
      </div>

      <div className={styles.fundStats}>
        <div className={styles.fundStat}>
          <h4 className={styles.amountCollected}>{amountCollected}</h4>
          <p className={styles.raisedText}>Raised of {target}</p>
        </div>
        <div className={styles.fundStat}>
          <h4 className={styles.remainingDays}>{remainingDays}</h4>
          <p className={styles.daysLeftText}>Days Left</p>
        </div>
      </div>

      <div className={styles.ownerInfo}>
        <div className={styles.userAvatar}>
          <img src={profile} alt="user" className={styles.avatarImage} />
        </div>
        <p className={styles.ownerText}>by <span className={styles.ownerName}>{owner}</span></p>
      </div>
    </div>
  </div>
  )
}

export default FundCard