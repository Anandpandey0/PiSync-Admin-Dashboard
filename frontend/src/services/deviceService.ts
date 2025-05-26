import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export type Device = {
  _id: string;
  name:string;
  lastSyncTime: string | null;
  syncStatus: 'Success' | 'Pending' | 'Failed';
};

export type ApiResponse = {
  devices: Device[];
  total: number;
  limit: number;
  page: number;
};


//Async service function to get the devices data from the backend url
export async function fetchDevices(page=  1, limit= 10): Promise<ApiResponse> {
  const { data } = await axios.get<ApiResponse>(`${API_BASE}/api/devices`, {
    params: { page, limit },
  });
  return data;
}
//Async service function to sync the device with the particalar id - Hits Backend
export async function syncDevice(id: string): Promise<void> {
  await axios.post(`${API_BASE}/api/devices/${id}/sync`);
}

//Async service function to Add dummy data to the Device Management table- Hits Backend
export async function addDummyDeviceData():Promise<void>{
    await axios.post(`${API_BASE}/api/devices/seed`);
}