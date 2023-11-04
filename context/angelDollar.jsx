import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import {angelTokenAddress} from '../utils/contractsData'
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

// Create the FetchContract context

export async function getTokenApproval(spender, amount) {
  const { contract } = useContract(angelTokenAddress);
  //const { mutateAsync: createCampaign, isLoading } = useContractWrite(contract, "createCampaign");
  console.log(contract)
   try {
    const approve = await contract.call('approve',spender,amount);

    console.log('Approval successful', approve);
  } catch (error) {
    console.error('Error getting approval', error);
    return [];
  }
}
