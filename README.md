To run the complete application on any machine, you can follow these detailed instructions:

---

# Donation Management System

This project is a Donation Management System that allows users to register donations, distribute donations, and generate reports.

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running locally
- Studio 3T for mongoDB (optional)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/avanisah/donation-management-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd donation-management-system
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the MongoDB database:
   
   - Make sure MongoDB is running locally.
   - Create a new database named `donation_inventory`.

5. Start the server:

   ```bash
   npm start
   ```

   This will start the server at `http://localhost:3000`.

6. Start the frontend development server:

   ```bash
   npm run start:client
   ```

   This will start the frontend development server at `http://localhost:3001`.

### Usage

- Access the application frontend at `http://localhost:3001`.
- Use the interface to register donations, distribute donations, and generate reports.


To download and install Studio 3T for MongoDB, you can follow these steps:

1. **Download Studio 3T:**

   - Go to the Studio 3T website: [Studio 3T Download](https://studio3t.com/download/).
   - Choose the appropriate version for your operating system (Windows, macOS, or Linux).
   - Click on the download button to start the download.

2. **Install Studio 3T:**

   - Once the download is complete, open the downloaded file to start the installation process.
   - Follow the on-screen instructions to install Studio 3T on your computer.
   - Studio 3T may require you to accept the terms of service and choose the installation directory.

3. **Launch Studio 3T:**

   - After installation, launch Studio 3T from the Start menu (Windows) or the Applications folder (macOS).
   - You may need to activate Studio 3T with a license key or use the trial version.

4. **Connect to MongoDB:**

   - In Studio 3T, click on the "Connect" button in the toolbar.
   - Select "New Connection" and choose the connection method (e.g., Direct Connection, MongoDB Atlas, etc.).
   - Enter the connection details (e.g., host, port, authentication) for your MongoDB instance.
   - Click on "Save & Connect" to establish a connection to your MongoDB database.

5. **Explore and Manage MongoDB:**

   - Once connected, you can explore your MongoDB databases, collections, and documents using Studio 3T's intuitive interface.
   - You can perform various operations such as querying, editing, importing/exporting data, and more.

Screenshots of the portal:

1. Home Page (Donation Page)
   ![Screenshot 2024-04-01 at 17 37 35](https://github.com/avanisah/donation-management-system/assets/48235653/4e113a5c-6d96-478c-90ae-c9d4fec60815)

   
2. Distribution Page
   ![Screenshot 2024-04-01 at 17 38 46](https://github.com/avanisah/donation-management-system/assets/48235653/af2390fa-51e6-44ed-a058-1dfbeb1c475f)

3. Inventory Report
   ![Screenshot 2024-04-01 at 17 39 40](https://github.com/avanisah/donation-management-system/assets/48235653/2ea60f7e-b643-40b2-b513-6d73d87f888f)

4. Donators Report
   ![Screenshot 2024-04-01 at 17 40 11](https://github.com/avanisah/donation-management-system/assets/48235653/4c71faf5-2b23-4d9e-8184-1f7f2a678c55)



