import React, { useState, useEffect } from 'react';
import DonationPage from './donationPage';

const AllDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await fetch('http://localhost:3000/donations');
      if (!response.ok) {
        throw new Error('Failed to fetch donations');
      }
      const data = await response.json();
      setDonations(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2>Donation Page</h2>
      <DonationPage />
      <h3>Donations</h3>
      <ul>
        {donations.map((donation) => (
          <li key={donation._id}>
            {donation.donorName} - {donation.donationType} - {donation.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllDonations;
