import React from 'react';
import DonationPage from './donationPage';
import DistributionPage from './distributionPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryReport from './InventoryReport';
import DonatorsReport from './DonatorsReport';

const App = () => {
  return (
    <Router>
      <Routes> {/* Wrap Routes around your Route components */}
        <Route exact path="/" element={<DonationPage />} />
        <Route path="/distribution" element={<DistributionPage />} />
        <Route path="/reports/inventory" element={<InventoryReport />} />
        <Route path="/reports/donator" element={<DonatorsReport />} />
      </Routes>
    </Router>
  );
};

export default App;
