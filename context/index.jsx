import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import {crowdFundingContractAddress} from '../utils/contractsData'
import { getTokenApproval } from '../context/angelDollar';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

// Create the FetchContract context
export const FetchContract = createContext();

export function MyComponent({children}) {
  const address = useAddress();
  const connect = useMetamask();
  const { contract } = useContract(crowdFundingContractAddress);
  const { mutateAsync: createCampaign, isLoading } = useContractWrite(contract, "createCampaign");
  console.log(contract)
  const publishCampaign = async (form) => {
    try {
      console.log(form.title);
      console.log(contract);
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(), // deadline,
          form.image,
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  }

const getCampaigns = async () => {
  try {
    const campaigns = await contract.call('getCampaigns');

    console.log('Fetched campaigns:', campaigns);

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaigns;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return [];
  }
}

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    try {
      // Ensure 'amount' is valid and greater than 0
      if (amount <= 0) {
        console.error('Invalid donation amount:', amount);
        return;
      } 
      const donationAmount = ethers.utils.parseUnits(amount,18)
      // Call the 'donateToCampaign' function in your smart contract
      const data = await contract.call('donateToCampaign', [pId,donationAmount]);
      console.log('Donation successful', data);
    } catch (error) {
      console.error('Error donating to campaign:', error);
    }
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  }

  // Provide the context value to the children
  return (
    <FetchContract.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      { children }
    </FetchContract.Provider>
  )
}
export const useMyComponent = () => useContext(FetchContract);