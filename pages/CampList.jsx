import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useMyComponent } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { logo } from '../assets';
import styles from "../styles/Home.module.css";
import { DisplayCampaigns } from '../components';

const CampList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
  
    const { address, contract, getCampaigns } = useMyComponent();
  
    const fetchCampaigns = async () => {
      setIsLoading(true);
      const data = await getCampaigns();
      setCampaigns(data);
      setIsLoading(false);
    }
  
    useEffect(() => {
      if(contract) fetchCampaigns();
    }, [address, contract]);
  
    return (
      <DisplayCampaigns 
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
  
    )
  }
  
  export default CampList;