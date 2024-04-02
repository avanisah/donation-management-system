import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DistributionPage = () => {
  const [donationId, setDonationId] = useState('');
  const [distributedQuantity, setDistributedQuantity] = useState('');
  const [distributionDate, setDistributionDate] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);


  const handleDistributionSubmit = async (e) => {
    e.preventDefault();
    
    if (!donationId || !distributedQuantity || !distributionDate) {
      setShowErrorMessage(true);
      return;
    }

    if (isNaN(distributedQuantity) || Number(distributedQuantity) <= 0) {
      setShowErrorMessage(true);
      return;
    }


    try {
      // Fetch donation details
      const donationResponse = await fetch(`http://localhost:3000/donations/${donationId}`);
      console.log(donationResponse);
      if (!donationResponse.ok) {
        throw new Error('Failed to fetch donation data');
      }
      const donationData = await donationResponse.json();

      // Check if donation date is valid
      const donationDate = new Date(donationData.date);
      const distributionDateObj = new Date(distributionDate);
      if (distributionDateObj < donationDate) {
        setShowErrorMessage(true);
        return;
      }

      // Check if donation quantity is less than distribution quantity
      const donationQuantity = donationData.quantity;
      if (Number(donationQuantity) < Number(distributedQuantity)) {
        setShowErrorMessage(true);
        return;
      }

      // Update the quantity for a given donationId
      const updatedQuantity = donationQuantity - Number(distributedQuantity);
      const updateResponse = await fetch(`http://localhost:3000/donations/${donationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify({ quantity: updatedQuantity }),
      });
      if (!updateResponse.ok) {
        throw new Error('Failed to update donation quantity');
      }

      const response = await fetch('http://localhost:3000/distribution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ donationId, distributedQuantity, distributionDate }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit distribution data');
      }
      console.log('Distribution submitted successfully');
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
      <h3>Distribution Page</h3>
      <form onSubmit={handleDistributionSubmit}>
        <TextField
          label="Donation ID"
          value={donationId}
          onChange={(e) => setDonationId(e.target.value)}
          fullWidth
        />
        <TextField
          label="Quantity to Distribute"
          type="number"
          value={distributedQuantity}
          onChange={(e) => setDistributedQuantity(e.target.value)}
          fullWidth
        />
        <TextField
          label="Distribution Date"
          type="date"
          value={distributionDate}
          onChange={(e) => setDistributionDate(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Distribute Donation
        </Button>
        {/* Error dialog */}
        <Dialog open={showErrorMessage} onClose={() => setShowErrorMessage(false)}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Validation failed. Please check your Distribution Quantity, Donation ID or Distribution Date.
              Please note: Distribution Quantity cannot be more than the donated quantity and Distribution Date should be later than the donation date.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowErrorMessage(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {showSuccessMessage && <p>Distribution added successfully!</p>}
        <Button variant="contained" color="secondary">
          <Link to="/"> Donation Home Page </Link>
        </Button>
      </form>
    </div>
  );
};

export default DistributionPage;
