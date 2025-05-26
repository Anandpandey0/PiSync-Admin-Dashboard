import React, { useEffect, useState } from 'react';
import Table from '@/components/Table';
import { fetchErrors, addDummyErrorData } from '@/services/errorService';

const ITEMS_PER_PAGE = 10;
// Error Logs Table 
const RecentErrorsTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchErrors(page, ITEMS_PER_PAGE);
      setData(res.errors);
      setTotalPages(Math.ceil((res.total || 1) / ITEMS_PER_PAGE));
    } catch (e) {
      alert('Error fetching errors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleAddDummy = async () => {
    setActionLoading(true);
    try {
      await addDummyErrorData();
      alert('Dummy error data added');
      setPage(1);
      fetchData();
    } catch {
      alert('Failed to add dummy data');
    } finally {
      setActionLoading(false);
    }
  };

  const rows = data.map((e, i) => [
    (page - 1) * ITEMS_PER_PAGE + i + 1,
    e.device?.name ?? 'N/A',
    e.message ?? 'N/A',
    e.createdAt ? new Date(e.createdAt).toLocaleString() : 'N/A',
  ]);
  const headersArray = ['S.No', 'Device Name', 'Error Message', 'Last Attempt']

  return (
    <div>
      <button onClick={handleAddDummy} disabled={actionLoading} className='float-right mr-16 font-bold border-black px-4 py-2 border-2 ml-4 rounded-md  cursor-pointer'>
        {actionLoading ? 'Adding...' : 'Add Dummy Errors Data'}
      </button>
      {loading ? <p>Loading...</p> : <Table title="Errors Table" headers={headersArray} rows={rows} />}
      <div className="mt-10 flex justify-center items-center space-x-4">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-3 py-1 border border-gray-400 bg-gray-100 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 border border-gray-400 bg-gray-100 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" 
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default RecentErrorsTable;
