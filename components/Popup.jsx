import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { angelAbi, angelTokenAddress } from '../utils/contractsData';
import { ethers } from 'ethers';


async function getApproval(address, amount) {

    const web3 = new Web3(window.ethereum);
  
    // Get the user's Ethereum address
    try {
        if (window.ethereum) {
          // Request user accounts
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
          const web3 = new Web3(window.ethereum);
          const account = accounts[0];
          console.log("address of connected account",account)
          // Fetch AngelGovernanceToken contract
          const angelDollarContract = new web3.eth.Contract(angelAbi, angelTokenAddress);
          console.log("angel dollar contract ", angelDollarContract)
          // Set LockTokensContract address 
          const result = await angelDollarContract.methods.approve(address,ethers.utils.parseUnits(amount,18)).send({from: account})
          
          console.log('Transaction Hash:', result.transactionHash);
          // Handle the result as needed
        } else {
          console.error('MetaMask not found or not properly connected.');
        }
      } catch (error) {
        console.error('Error setting LockTokensContract:', error);
      }

}

function Popup({ isOpen, closePopup, onTransactionSuccess,contractAddress,tokenAmount }) {
  useEffect(() => {
    if (isOpen) {

      getApproval(contractAddress,tokenAmount).then(() => {
        onTransactionSuccess();
        closePopup();
      })
      // After the contract transaction is approved, call onTransactionSuccess to trigger the next function
      // Once the next function is complete, you can close the popup
      // Example:
      // contractApprovalFunction().then(() => {
      //   onTransactionSuccess();
      //   closePopup();
      // });
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div >
      <div>
        <p>Waiting for contract transaction approval...</p>
      </div>
    </div>
  );
}

export default Popup;