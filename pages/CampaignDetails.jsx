import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useMyComponent } from '../context';
import { CountBox, CustomButton, Loader, Popup } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { angeldaologo, thirdweb } from '../assets';
import Web3 from 'web3';
import {angelAbi,crowdFundingContractAddress,governanceAbi} from '../utils/contractsData'

const CampaignDetails = () => {
  const router = useRouter();
  
  const { data } =  router.query;
  const state = JSON.parse(data)
  console.log("this is the state value",state)
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  //const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useMyComponent();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }

  useEffect(() => {

    if (contract) fetchDonators();
  }, [contract, address])

  const handleDonate = async () => {

    setIsPopupOpen(true);
    //navigate('/')
  }
  const handleTransactionSuccess = async () => {

    setIsLoading(true);
    await donate(state.pId, amount);
    setIsLoading(false);
    
  }

  return (
    <div>
      <div className="mt-10 space-y-5 md:space-y-0 md:flex md:flex-row flex-col gap-[30px]">
      <Popup
        isOpen={isPopupOpen}
        closePopup={() => setIsPopupOpen(false)}
        contractAddress={crowdFundingContractAddress}
        tokenAmount={amount}
        onTransactionSuccess={handleTransactionSuccess}
      />
        <div className="w-full">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl" />
          <div className="relative w-full h-[5px] bg-[#492d1a] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%` }}>
            </div>
          </div>
        </div>

        <div className="md:w-[150px] w-full flex flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] gap-5 md:gap-0 md:flex lg:flex-row flex-col">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-xl text-white uppercase">Creator</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={angeldaologo} alt="user" className="w-[60%] h-[60%] object-contain" />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.owner}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p>
              </div>
            </div>
          </div>
           <div>
          <h4 className="font-epilogue font-semibold text-xl text-white uppercase">Story</h4>
          <div className="mt-[20px]">
            <p className="font-epilogue font-normal text-lg text-[#808191] text-justify">{state.description}</p>
          </div></div>

          <div>
          <h4 className="font-epilogue font-semibold text-xl text-white uppercase">Donators</h4>
          <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? donators.map((item, index) => (
                <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                  <p className="font-epilogue font-normal text-lg text-[#b2b3bd] break-ll">{index + 1}. {item.donator}</p>
                  <p className="font-epilogue font-normal text-lg text-[#808191] break-ll">{item.donation}</p>
                </div>
              )) : (
                <p className="font-epilogue font-normal text-lg text-[#808191] text-justify">No donators yet. Be the first one!</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-xl text-white uppercase">Fund</h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue font-medium text-xl text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ADT 0.1"
                step="0.01"
                className="w-full py-3 px-4 outline-none border border-[#3a3a43] bg-transparent font-epilogue text-white text-lg placeholder-[#4b5264] rounded-lg"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="mt-[20px] p-4 bg-[#13131a] rounded-lg">
                <h4 className="font-epilogue font-semibold text-base text-white">Back it because you believe in it.</h4>
                <p className="mt-[20px] font-epilogue font-normal text-base text-[#808191]">Support the project for no reward, just because it speaks to you.</p>
              </div>

              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;
