import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { Popup } from '../components';
import styles from '../styles/LockTokensPage.module.css';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import {angelAbi,governanceAbi,angelTokenAddress,governanceTokenAddress, lockTokensAddress, lockTokensAbi} from '../utils/contractsData'

const LockTokensPage = () => {
    const [angelDollarBalance, setAngelDollarBalance] = useState(0);
    const [angelGovernanceTokenBalance, setAngelGovernanceTokenBalance] = useState(0);
    const [amountToLock, setAmountToLock] = useState(0);
    const [outputAmount, setOutputAmount] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(true);
    const  { contract }  = useContract(lockTokensAddress);
    const { mutateAsync: swap, isLoading } = useContractWrite(contract, "swap");
    const connect = useMetamask();
    const angelDollarAddress = angelTokenAddress;
    const angelGovernanceTokenAddress = governanceTokenAddress;
    let angelDollarContract,angelGovernanceTokenContract,userAddress
    useEffect(() => {
      // Initialize Web3.js
      const web3 = new Web3(window.ethereum);
  
      // Get the user's Ethereum address
      window.ethereum.enable().then(function (accounts) {
        userAddress = accounts[0];
        
        // Fetch AngelDollar and AngelGovernanceToken balances
        // Replace with your actual contract addresses
        angelDollarContract = new web3.eth.Contract(angelAbi, angelDollarAddress);
        angelGovernanceTokenContract = new web3.eth.Contract(governanceAbi, angelGovernanceTokenAddress);
        angelDollarContract.methods.balanceOf(userAddress).call().then(balance => {
          setAngelDollarBalance(ethers.utils.formatEther(balance));
        });
  
        angelGovernanceTokenContract.methods.balanceOf(userAddress).call().then(balance => {
          setAngelGovernanceTokenBalance(ethers.utils.formatEther(balance));
        });
      });
    }, []);

  const handleLock = async () => {
    // Check that the amount to lock is greater than or equal to 30
    setIsPopupOpen(true);
  };

  const handleTransactionSuccess = async () => {

    if (amountToLock >= 30) {
      try {
        if (window.ethereum) {
          // Request user accounts
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
          const web3 = new Web3(window.ethereum);
          const account = accounts[0];
          console.log("address of connected account",account)
          // Fetch AngelGovernanceToken contract
          const LockTokensContract = new web3.eth.Contract(lockTokensAbi, lockTokensAddress);
          console.log("angel dollar contract ", LockTokensContract)
          // Set LockTokensContract address 
          const result = await LockTokensContract.methods.swap(ethers.utils.parseUnits(amountToLock,18)).send({from: account})
          
          console.log('Transaction Hash:', result.transactionHash);
          // Handle the result as needed
        } else {
          console.error('MetaMask not found or not properly connected.');
        }
      } catch (error) {
        console.error('Error setting LockTokensContract:', error);
      }
      // Update balances after the swap
     // const updatedAngelDollarBalance = await angelDollarContract.methods.balanceOf(userAddress).call();
     // const updatedAngelGovernanceTokenBalance = await angelGovernanceTokenContract.methods.balanceOf(userAddress).call();

     // setAngelDollarBalance(updatedAngelDollarBalance);
      //setAngelGovernanceTokenBalance(updatedAngelGovernanceTokenBalance);

      // Clear the input field
      setAmountToLock(0);
    } else {
      alert('Amount to lock must be greater than or equal to 30');
    }   
 
  }

  const handleAmountChange = (event) => {
    const inputAmount = event.target.value;
    setAmountToLock(inputAmount);

    // Calculate the output amount based on the swap ratio
    const calculatedOutput = inputAmount / 30;
    setOutputAmount(calculatedOutput);
  };

  return (
    <div className={styles.lockTokensContainer}>
    <Popup
      isOpen={isPopupOpen}
      closePopup={() => setIsPopupOpen(false)}
      contractAddress={lockTokensAddress}
      tokenAmount={amountToLock}
      onTransactionSuccess={handleTransactionSuccess}
    />
    <h2>Angel Dollar Balance: {angelDollarBalance}</h2>
    <div className={styles.inputContainer}>
      <label>Amount to Lock:</label>
      <input type="number" value={amountToLock} onChange={handleAmountChange} />
    </div>
    <div className={styles.outputContainer}>
      <label>Output (Angel Governance Token):</label>
      <span>{outputAmount}</span>
    </div>
    <button className={styles.lockButton} onClick={handleLock}>Lock</button>
    <h2>Angel Governance Token Balance: {angelGovernanceTokenBalance}</h2>
  </div>
  );
};

export default LockTokensPage;