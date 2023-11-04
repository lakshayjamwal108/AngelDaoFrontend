import React from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import styles from '../styles/DisplayCampaigns.module.css'

import { loader } from '../assets';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useRouter();
  
  const handleNavigate = (campaign) => {
    console.log("this is the campaigns's value",campaign)
    navigate.push({
      pathname :`/CampaignDetails/`,query : {data : JSON.stringify(campaign) } })
  }
  
  return (
    <div className={styles.campaignsContainer}>
      <h1 className={styles.title}>{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-4 gap-4">
        {isLoading && (
          <img src={loader} alt="loader" className={styles.loaderImage} />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className={styles.noCampaignsText}>
            You have not created any campigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard 
          key={uuidv4()}
          {...campaign}
          handleClick={() => handleNavigate(campaign)}
        />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns