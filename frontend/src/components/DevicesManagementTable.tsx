import React, { useEffect, useState } from 'react';
import Table from '@/components/Table';
import { fetchDevices, syncDevice, addDummyDeviceData } from '@/services/deviceService';

const ITEMS_PER_PAGE = 10;
// Device Management Component
const DeviceManagementTable = () => {
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [syncingId, setSyncingId] = useState<string | null>(null);
    const headersArray = ['S.No', 'Device Name', 'Last Sync Time', 'Sync Status', 'Action']



    //Async function to get data from the service function
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetchDevices(page, ITEMS_PER_PAGE);
            setData(res.devices);
            setTotalPages(Math.ceil((res.total || 1) / ITEMS_PER_PAGE));
        } catch (e) {
            alert('Error fetching devices');
        } finally {
            setLoading(false);
        }
    };


    //Trigger the fetchData function each time the page changes or the sync happens
    useEffect(() => {
        fetchData();
    }, [page, syncingId]);



    //Arrow functios that triggers the sync function 
    const handleSync = async (id: string) => {
        setSyncingId(id);
        try {
            await syncDevice(id);
            alert('Synced!');
        } catch {
            alert('Sync failed');
        } finally {
            setSyncingId(null);
        }
    };



    //Arrow function that adds 20 dummy devices data 
    const handleAddDummy = async () => {
        setActionLoading(true);
        try {
            await addDummyDeviceData();
            alert('Dummy data added');
            setPage(1);
            fetchData();
        } catch {
            alert('Failed to add dummy data');
        } finally {
            setActionLoading(false);
        }
    };



    //Added the button at last in order to reuse the Table Component
    const rows = data.map((d, i) => [
        (page - 1) * ITEMS_PER_PAGE + i + 1,
        d.name ?? 'N/A',
        d.lastSyncTime ? new Date( d.lastSyncTime).toLocaleString() : 'N/A', // Convert into readable Date and time
        d.syncStatus ?? 'N/A',
        <button onClick={() => handleSync(d._id)} disabled={syncingId === d._id} className='px-4 py-2 border-2 ml-4 rounded-md font-bold border-black'>
            {syncingId === d._id ? 'Syncing Device...' : 'Sync Now'}
        </button>,
    ]);

    return (
        <div>
            <button onClick={handleAddDummy} disabled={actionLoading} className='float-right mr-16 font-bold border-black px-4 py-2 border-2 ml-4 rounded-md  '>
                {actionLoading ? 'Adding...' : 'Add Dummy Devices Data'}
            </button>
            {loading ? <p>Loading...</p> : <Table title="Devices Table" headers={headersArray} rows={rows} />}
            <div className="mt-10 flex justify-center items-center space-x-4">
                <button
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 1}
                    className="px-3 py-1 border border-gray-400 bg-gray-100 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-sm">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page === totalPages}
                    className="px-3 py-1 border border-gray-400 bg-gray-100 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>


        </div>
    );
};

export default DeviceManagementTable;
