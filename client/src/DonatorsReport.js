// DonatorsReport.js
import React, { useState, useEffect } from 'react';

const DonatorsReport = () => {
  const [donatorsReport, setDonatorsReport] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/reports/donators')
      .then((response) => response.json())
      .then((data) => setDonatorsReport(data))
      .catch((error) => console.error('Error fetching donators report:', error));
  }, []);

  return (
    <div>
      <h2>Donators Report</h2>
      <ul>
        {donatorsReport.map((donator) => (
          <li key={donator._id}>
            {donator._id}: {donator.totalDonations}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonatorsReport;
