import React, { useState } from 'react';
import DeviceManagementTable from '@/components/DevicesManagementTable';
import RecentErrorsTable from '@/components/RecentErrorsTable';
import Header from '@/components/Header';

const DashboardPage = () => {
  // State to handle the table selection
  const [activeTab, setActiveTab] = useState<'DeviceManagementTable' | 'RecentErrorsTable'>('DeviceManagementTable');

  return (
    <>
      <Header />
      <div className="mt-8 mb-12 px-4">
        <div className="mb-6 flex space-x-4">
          {/* Button which will render the Device Management Table */}
          <button
            onClick={() => setActiveTab('DeviceManagementTable')}
            className={`px-4 py-2 border-2 rounded-md ${
              activeTab === 'DeviceManagementTable'
                ? 'font-bold border-black'
                : 'font-normal border-gray-300'
            }`}
          >
            Device Management
          </button>
          {/* Button that renders the Error logs table */}
          <button
            onClick={() => setActiveTab('RecentErrorsTable')}
            className={`px-4 py-2 border-2 rounded-md ${
              activeTab === 'RecentErrorsTable'
                ? 'font-bold border-black'
                : 'font-normal border-gray-300'
            }`}
          >
            Recent Errors
          </button>
        </div>
            {/* Render either of the table */}
        {activeTab === 'DeviceManagementTable' ? <DeviceManagementTable /> : <RecentErrorsTable />}
      </div>
    </>
  );
};

export default DashboardPage;
