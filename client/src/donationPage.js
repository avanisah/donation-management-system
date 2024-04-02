import { Link, Route, Router, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InventoryReport from './InventoryReport';
import DonatorsReport from './DonatorsReport';

const DonationPage = () => {
  const [donorName, setDonorName] = useState('');
  const [donationType, setDonationType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ donorName, donationType, quantity, date }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit donation data');
      }
      console.log('Donation submitted successfully');
      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Error:', error.message);
    }
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };



  return (
    <div>
      <h2>Donation Registration and Distribution</h2>
      <h3>Record Donation</h3>
      <form onSubmit={handleDonationSubmit}>
        <TextField
          label="Donor Name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Donation Type"
          value={donationType}
          onChange={(e) => setDonationType(e.target.value)}
          fullWidth
        />
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: donationType === 'Money' ? '$' : donationType === 'Food' ? 'lb' : null,
          }}
        />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Donation
        </Button>
    
        {showSuccessMessage && <p>Donation recorded successfully!</p>}
         <Button variant="contained" color="secondary">
          <Link to="/reports/inventory"> Inventory Report </Link>
        </Button>
        <Button variant="contained" color="secondary">
          <Link to="/reports/donator"> Donator Report </Link>
        </Button>
        <Button variant="contained" color="secondary">
          <Link to="/distribution"> Distribution </Link>
        </Button>
        
      </form>
    </div>
  );
};

export default DonationPage;
