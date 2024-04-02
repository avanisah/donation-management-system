const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Donation = require('./models/donation');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/donation_inventory')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the application if MongoDB connection fails
  });

const app = express();
const cors = require('cors');
app.use(bodyParser.json());
// Allow CORS requests from all origins
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add PUT to the allowed methods
}));


app.get('/', (req, res) => {
  res.send('Donation Registration is live!');
});

// Route for recording new donations
app.post('/donations', async (req, res) => {
  try {
    const { donorName, donationType, quantity, date } = req.body;
    const donation = new Donation({ donorName, donationType, quantity, date });
    await donation.save();
    res.status(201).json({ message: 'Donation recorded successfully' });
  } catch (err) {
    console.error('Error recording donation:', err.message);
    res.status(500).json({ message: 'Failed to record donation' });
  }
});

// Route to fetch donation by ID
app.get('/donations/:donationId', async (req, res) => {
  try {
    const donationId = req.params.donationId;
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update the quantity for a given donationId
app.put('/donations/:donationId', async (req, res) => {
  const { donationId } = req.params;
  const { quantity } = req.body;

  try {
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    donation.quantity = quantity;
    await donation.save();
    res.json({ message: 'Quantity updated successfully' });
  } catch (err) {
    console.error('Error updating quantity:', err.message);
    res.status(500).json({ message: 'Failed to update quantity' });
  }
});

// Route for recording donation distribution
app.post('/distribution', async (req, res) => {
  try {
    const { donationId, distributedQuantity, distributionDate } = req.body;
    const donation = await Donation.findById(donationId);

    // Check if donation exists
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Check if distributed quantity exceeds donation quantity
    if (donation.quantity < donation.distributedQuantity + distributedQuantity) {
      return res.status(400).json({ message: 'Distributed quantity exceeds donation quantity' });
    }

    // Check if distribution date is greater than donation date
    if (distributionDate <= donation.date) {
      return res.status(400).json({ message: 'Distribution date must be greater than donation date' });
    }

    // Parse distributedQuantity to a number
    const parsedDistributedQuantity = parseInt(distributedQuantity, 10);

    // Ensure parsedDistributedQuantity is a valid number
    if (isNaN(parsedDistributedQuantity)) {
      return res.status(400).json({ message: 'Invalid distributedQuantity value' });
    }

    // Calculate the new distributedQuantity by adding the parsedDistributedQuantity
    // to the existing distributedQuantity for the donation
    const newDistributedQuantity = donation.distributedQuantity + parsedDistributedQuantity;

    // Update the donation with the new distributedQuantity
    donation.distributedQuantity = newDistributedQuantity;


    // donation.distributedQuantity += distributedQuantity;
    await donation.save();
    res.json({ message: 'Distribution recorded successfully' });
  } catch (err) {
    console.error('Error recording distribution:', err.message);
    res.status(500).json({ message: 'Failed to record distribution' });
  }
});

// Route for generating inventory report
app.get('/reports/inventory', async (req, res) => {
  try {
    const inventoryReport = await Donation.aggregate([
      { $group: { _id: '$donationType', totalQuantity: { $sum: '$quantity' }, totalDistributed: { $sum: '$distributedQuantity' } } }
    ]);
    res.json(inventoryReport);
  } catch (err) {
    console.error('Error generating inventory report:', err.message);
    res.status(500).json({ message: 'Failed to generate inventory report' });
  }
});

// Route for generating donator report
app.get('/reports/donators', async (req, res) => {
  try {
    const donatorReport = await Donation.aggregate([
      { $group: { _id: '$donorName', totalDonations: { $sum: '$quantity' } } }
    ]);
    res.json(donatorReport);
  } catch (err) {
    console.error('Error generating donator report:', err.message);
    res.status(500).json({ message: 'Failed to generate donator report' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
