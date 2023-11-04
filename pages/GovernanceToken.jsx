import React, { useState } from 'react';
import Web3 from 'web3';
import {governanceTokenAddress,governanceAbi,lockTokensAddress} from '../utils/contractsData'
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
const SetLockTokensContract = () => {
    const address = useAddress();
    const connect = useMetamask();
    const angelGovernanceTokenAddress = governanceTokenAddress;
    const handleSetLockTokensContract = async () => {
  
    // Get the user's Ethereum address
    try {
        if (window.ethereum) {
          // Request user accounts
          await window.ethereum.request({ method: 'eth_requestAccounts' });
    
          const web3 = new Web3(window.ethereum);
          
          // Fetch AngelGovernanceToken contract
          const angelGovernanceTokenContract = new web3.eth.Contract(governanceAbi, angelGovernanceTokenAddress);
    
          // Set LockTokensContract address
          const result = await angelGovernanceTokenContract.methods.setLockTokensContract(lockTokensAddress).send({ from: address });
    
          console.log('Transaction Hash:', result.transactionHash);
          // Handle the result as needed
        } else {
          console.error('MetaMask not found or not properly connected.');
        }
      } catch (error) {
        console.error('Error setting LockTokensContract:', error);
      }
  };

  return (
    <div>
      <h1>Set LockTokensContract Address</h1>
      <div>
        <label>LockTokensContract Address:</label>
      </div>
      <button onClick={handleSetLockTokensContract}>Set LockTokensContract</button>
    </div>
  );
};

export default SetLockTokensContract;
