import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import styles from "../styles/CreateCampaign.module.css";
import { useMyComponent } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
const CreateCampaign = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useMyComponent();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) });
        setIsLoading(false);
      } else {
        alert('Provide a valid image URL');
        setForm({ ...form, image: '' });
      }
    });
  };

  return (
    <main>
      <div className={styles.main} >
        <div className={styles.header}>
          <h1 className={styles.title}>
            Create{" "}
            <span className={styles.gradientText0}>
              <a
                target="_blank"
                rel="noopener noreferrer"
              >
                Campaign.
              </a>
            </span>
          </h1>
        </div>
      </div>
      
      <div className={styles.main}>
      <div className={styles.container}>
      <div className={styles.centeredFormContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Your Name *</label>
            <input
              name="Your Name"
              type="text"
              id="name"
              value={form.name}
              onChange={(e) => handleFormFieldChange('name', e)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="title">Campaign Title *</label>
            <input
              name="Campaign Title"
              type="text"
              id="title"
              value={form.title}
              onChange={(e) => handleFormFieldChange('title', e)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Story *</label>
            <input
              name="Story"
              id="description"
              isTextArea
              value={form.description}
              onChange={(e) => handleFormFieldChange('description', e)}
            />
          </div>
          <div className={styles.moneyInfo}>
            <img src={money} alt="money" className={styles.moneyIcon} />
            <h4 className={styles.moneyInfoText}>
              You will get 100% of the raised amount
            </h4>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.goalAndEndDate}>
              <label htmlFor="target">Goal *</label>
              <input
                name="Goal"
                type="text"
                id="target"
                value={form.target}
                onChange={(e) => handleFormFieldChange('target', e)}
              />
              <label htmlFor="deadline">End Date *</label>
              <input
                name="End Date"
                type="date"
                id="deadline"
                value={form.deadline}
                onChange={(e) => handleFormFieldChange('deadline', e)}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="image">Campaign image *</label>
            <input
              name="Campaign image"
              type="url"
              id="image"
              value={form.image}
              onChange={(e) => handleFormFieldChange('image', e)}
            />
          </div>
          <div className={styles.submitButtonContainer}>
            <CustomButton
              btnType="submit"
              title="Submit new campaign"
              styles={styles.submitButton}
            />
          </div>
        </form>
      </div>
    </div>
      </div>
    </main>
  );
};

export default CreateCampaign;
