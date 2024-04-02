import React, { useState, useEffect } from 'react';

const InventoryReport = () => {
  const [inventoryReport, setInventoryReport] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/reports/inventory')
      .then((response) => response.json())
      .then((data) => setInventoryReport(data))
      .catch((error) => console.error('Error fetching inventory report:', error));
  }, []);

  return (
    <div>
      <h2>Inventory Report</h2>
      <ul>
        {inventoryReport.map((item) => (
          <li key={item._id}>
            {item._id}: Total Quantity - {item.totalQuantity}, Total Distributed - {item.totalDistributed}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryReport;
